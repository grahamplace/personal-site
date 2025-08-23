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
  heroProgress: number;
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
  const [isHeroMode, setIsHeroMode] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);

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
    const HERO_ENTER_PX = 120; // re-enter hero only near very top (hysteresis)
    const onScroll = () => {
      if (isNavigatingRef.current) return; // Skip during programmatic navigation

      // Exit hero mode on first scroll
      if (isHeroModeRef.current) {
        const progress = Math.max(
          0,
          Math.min(1, window.scrollY / HERO_EXIT_PX)
        );
        if (progress !== heroProgress) setHeroProgress(progress);
        if (progress >= 1) {
          setIsHeroMode(false);
          isHeroModeRef.current = false;
          setHeroProgress(1);
          // guard re-entry briefly to avoid reflow-caused flips
          reentryGuardUntilRef.current = performance.now() + 250;
        }
      } else {
        // TEMP DISABLE: Do not re-enter hero mode via scroll
        if (heroProgress !== 1) setHeroProgress(1);
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
    // Exit hero mode if we're navigating to a different section
    if (section !== 'hero') {
      setIsHeroMode(false);
      setHeroProgress(1);
    }
    // TEMP DISABLE: Prevent programmatic navigation back to hero
    if (section === 'hero') return;

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
    isHeroMode,
    heroProgress,
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
