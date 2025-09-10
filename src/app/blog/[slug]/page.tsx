import { notFound } from 'next/navigation';
import { allSlugs, blogPosts } from '@/content/blog/_manifest';
import { GlassPane } from '@/components/ui/glass-pane';
import { BlogPostClient } from '@/components/blog/blog-post-client';
import { BlogRouteHeader } from '@/components/blog/blog-header';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const loader = blogPosts[slug];
  if (!loader) notFound();
  // Defer MDX rendering to a client component to avoid RSC context errors

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <BlogRouteHeader />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-48">
        <GlassPane variant="default">
          <BlogPostClient slug={slug} />
        </GlassPane>
      </div>
    </div>
  );
}
