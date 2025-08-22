'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type Section = 'hero' | 'experience' | 'blog' | 'contact';

interface NavigationContextType {
  currentSection: Section;
  isHomePage: boolean;
  currentBlogSlug: string | null;
  navigateToSection: (section: Section) => void;
  openBlogPost: (slug: string) => void;
  closeBlogPost: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigation(): NavigationContextType {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}

interface NavigationProviderProps {
  children: ReactNode;
}

function inferSectionFromPath(path: string): Section {
  if (path.startsWith('/blog')) return 'blog';
  if (path.startsWith('/contact')) return 'contact';
  if (path.startsWith('/experience')) return 'experience';
  return 'hero';
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isNavigating) {
      setCurrentSection(inferSectionFromPath(pathname));
    }
  }, [pathname, isNavigating]);

  // Restore blog overlay from URL on load
  useEffect(() => {
    const url = new URL(window.location.href);
    const post = url.searchParams.get('post');
    if (post) setCurrentBlogSlug(post);
  }, []);

  const navigateToSection = (section: Section) => {
    if (section === currentSection) return;
    setIsNavigating(true);
    setCurrentSection(section);
    if (section === 'hero') router.push('/');
    else router.push('/');
    setTimeout(() => setIsNavigating(false), 100);
  };

  const openBlogPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set('post', slug);
    window.history.pushState({}, '', url.toString());
  };

  const closeBlogPost = () => {
    setCurrentBlogSlug(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('post');
    window.history.pushState({}, '', url.toString());
  };

  const value: NavigationContextType = {
    currentSection,
    isHomePage,
    currentBlogSlug,
    navigateToSection,
    openBlogPost,
    closeBlogPost,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
