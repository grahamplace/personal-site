# Personal Site - [graham.place](https://graham.place)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Viz**: D3.js
- **Content**: MDX for blog posts
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd personal-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` to configure your homepage variant and other settings.

4. **Set up Git hooks**
   ```bash
   npm run prepare
   ```

## 🚀 Development

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter with metadata:

   ```mdx
   ---
   title: 'Your Post Title'
   date: '2024-01-01'
   tags: ['tag1', 'tag2']
   summary: 'Brief description of the post'
   ---

   Your content here...
   ```

### Adding Projects

1. Edit `src/content/projects.json` to add new project entries
2. Include images in `public/images/` directory
3. Follow the existing schema for consistency

### Updating Profile

Edit `src/content/profile.json` to update personal information and links.

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Vitest with React Testing Library
- **Component Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Ensure keyboard navigation and screen reader support

Run tests with:

```bash
npm run test
```

## 📊 Performance & SEO

- **Lighthouse**: Target 90+ scores for Performance, Accessibility, Best Practices, and SEO
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **SEO**: Structured data, OpenGraph tags, sitemap.xml
- **Analytics**: Ready for Vercel Analytics or Plausible

## 🎯 Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Readers**: Semantic HTML and ARIA labels
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Focus Management**: Visible focus indicators
- **Color Contrast**: High contrast ratios for readability

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── content/            # MDX and JSON content files
├── lib/                # Utility functions and helpers
├── styles/             # Global styles and Tailwind config
└── test/               # Test setup and utilities
```
