'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type Section = 'hero' | 'experience' | 'blog' | 'contact';

interface NavigationContextType {
  currentSection: Section;
  isHomePage: boolean;
  isHeroMode: boolean;
  isNavigating: boolean;
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
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHeroMode, setIsHeroMode] = useState(true);

  // Refs to avoid stale closures in scroll handlers
  const isNavigatingRef = useRef(isNavigating);
  const isHeroModeRef = useRef(isHeroMode);
  const lastScrollYRef = useRef(0);
  const reentryGuardUntilRef = useRef(0);
  useEffect(() => {
    isNavigatingRef.current = isNavigating;
  }, [isNavigating]);
  useEffect(() => {
    isHeroModeRef.current = isHeroMode;
  }, [isHeroMode]);

  // Determine header visibility: hide when in hero mode
  const isHomePage = useMemo(() => isHeroMode, [isHeroMode]);

  // Scroll spy: detect which section is currently in view
  useEffect(() => {
    const sectionIds: Section[] = ['hero', 'experience', 'blog', 'contact'];

    const getCurrentSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.4; // 40% of viewport height

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

    const HERO_EXIT_PX = 400; // distance to fully transition from hero to header
    const onScroll = () => {
      if (isNavigatingRef.current) return; // Skip during programmatic navigation

      // Exit hero mode on scroll
      if (isHeroModeRef.current && window.scrollY > HERO_EXIT_PX) {
        setIsHeroMode(false);
        isHeroModeRef.current = false;
        // guard re-entry briefly to avoid reflow-caused flips
        reentryGuardUntilRef.current = performance.now() + 250;
      }

      const newSection = getCurrentSection();
      setCurrentSection((prev) => (prev !== newSection ? newSection : prev));
      lastScrollYRef.current = window.scrollY;
    };

    // Initial check
    onScroll();

    // Add scroll listener
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

    if (section === 'hero') {
      setIsHeroMode(true);
      setCurrentSection('hero');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Make hero overlay fade, but keep content mounted; scroll immediately
      setIsHeroMode(false);
      setCurrentSection(section);

      // Scroll using manual offset accounting for current header height
      const scrollWithHeaderOffset = () => {
        const header = document.getElementById('site-header');
        const target = document.getElementById(section);
        if (!target) return;

        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const y = Math.max(0, targetTop - headerHeight - 8); // 8px breathing room

        window.scrollTo({ top: y, behavior: 'smooth' });
      };

      // Retry a few times to handle in-flight header height transitions
      let attempts = 0;
      const tryScroll = () => {
        attempts++;
        scrollWithHeaderOffset();
        if (attempts < 3) {
          setTimeout(tryScroll, 90);
        }
      };
      requestAnimationFrame(tryScroll);
    }

    // Re-enable scroll spy after scroll animation completes
    setTimeout(() => {
      setIsNavigating(false);
    }, 900);
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
    isHeroMode,
    isNavigating,
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
