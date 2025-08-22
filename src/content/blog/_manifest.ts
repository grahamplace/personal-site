export type MDXModule = { default: React.ComponentType };

// Explicit manifest of blog posts to make Turbopack include MDX files
export const blogPosts: Record<string, () => Promise<MDXModule>> = {
  'lessons-from-scaling-data-infra': () =>
    import('./lessons-from-scaling-data-infra.mdx'),
};

export const allSlugs = Object.keys(blogPosts);
