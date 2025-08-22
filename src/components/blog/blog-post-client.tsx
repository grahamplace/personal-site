'use client';

import { useEffect, useState } from 'react';
import { MDXRenderer } from '@/components/blog/mdx-renderer';
import type { MDXModule } from '@/content/blog/_manifest';
import { blogPosts } from '@/content/blog/_manifest';

interface BlogPostClientProps {
  slug: string;
}

export function BlogPostClient({ slug }: BlogPostClientProps) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = blogPosts[slug];
    if (!loader) return;
    loader().then((mod: MDXModule) => {
      if (mounted) setComp(() => mod.default);
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!Comp) {
    return <div className="px-6 py-12 text-center text-white/80">Loading…</div>;
  }

  return (
    <MDXRenderer>
      <Comp />
    </MDXRenderer>
  );
}
