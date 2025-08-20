import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { ThemeAccent } from '@/components/theme/theme-accent';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
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
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeAccent />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
