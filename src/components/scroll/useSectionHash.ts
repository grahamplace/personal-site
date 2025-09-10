'use client';

import { useEffect, useState } from 'react';

export function useSectionHash(ids: string[]) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id && visible.target.id !== current) {
          setCurrent(visible.target.id);
          history.replaceState(null, '', `#${visible.target.id}`);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return current;
}
