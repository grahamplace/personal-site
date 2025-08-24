import type { Metadata } from 'next';
import { Inter, Raleway, Geist_Mono } from 'next/font/google';
import { ThemeAccent } from '@/components/theme/theme-accent';
import { GlobalBackground } from '@/components/theme/global-background';
import { GlobalHeader } from '@/components/theme/global-header';
import { NavigationProvider } from '@/components/theme/global-navigation';
import { BlogPostOverlay } from '@/components/blog/blog-post-overlay';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Graham Place - Software Engineer & Builder',
  description:
    'Engineer & builder with a focus on data systems and product impact. Scaling infrastructure, founding companies, shipping products.',
  keywords: [
    'Software Engineer',
    'Data Infrastructure',
    'Startup Founder',
    'Product Development',
  ],
  authors: [{ name: 'Graham Place' }],
  creator: 'Graham Place',
  openGraph: {
    title: 'Graham Place - Software Engineer & Builder',
    description:
      'Engineer & builder with a focus on data systems and product impact.',
    url: 'https://graham.place',
    siteName: 'Graham Place',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graham Place - Software Engineer & Builder',
    description:
      'Engineer & builder with a focus on data systems and product impact.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${raleway.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NavigationProvider>
          <ThemeAccent />
          <GlobalBackground />
          <GlobalHeader />
          <main className="min-h-screen">{children}</main>
          <BlogPostOverlay />
        </NavigationProvider>
      </body>
    </html>
  );
}
