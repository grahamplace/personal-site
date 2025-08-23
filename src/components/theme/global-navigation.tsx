'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

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

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Determine header visibility: hide when at top of hero
  const isHomePage = useMemo(
    () => currentSection === 'hero' && isAtTop,
    [currentSection, isAtTop]
  );

  // Scroll spy: detect which section is currently in view
  useEffect(() => {
    const sectionIds: Section[] = ['hero', 'experience', 'blog', 'contact'];

    const getCurrentSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.3; // 30% of viewport height

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;

        // Check if the threshold point is within this section
        if (
          scrollY + threshold >= elementTop &&
          scrollY + threshold < elementBottom
        ) {
          return sectionId as Section;
        }
      }

      return 'hero'; // fallback
    };

    const onScroll = () => {
      if (isNavigating) return; // Skip scroll spy during programmatic navigation

      const newSection = getCurrentSection();
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    };

    // Initial check
    onScroll();

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentSection]);

  // Track whether we are at top of the page
  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY < 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update global gradient colors when section changes (debounced)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__setGradientSection) {
      const timeoutId = setTimeout(() => {
        if (window.__setGradientSection) {
          window.__setGradientSection(currentSection);
        }
      }, 150); // 150ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [currentSection]);

  // Restore blog overlay from URL on load
  useEffect(() => {
    const url = new URL(window.location.href);
    const post = url.searchParams.get('post');
    if (post) setCurrentBlogSlug(post);
  }, []);

  const navigateToSection = (section: Section) => {
    setIsNavigating(true);
    setCurrentSection(section); // Immediately set the target section

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Re-enable scroll spy after scroll animation completes
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000); // Slightly longer than typical smooth scroll duration
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
