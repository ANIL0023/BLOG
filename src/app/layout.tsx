import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Blogo — Share Your Genius with the World',
    template: '%s | Blogo',
  },
  description:
    'A modern blogging platform for sharing ideas, expertise, and stories. Discover articles on technology, design, business, AI, and more.',
  keywords: ['blog', 'writing', 'technology', 'design', 'articles', 'stories'],
  authors: [{ name: 'Blogo Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blogo.dev',
    title: 'Blogo — Share Your Genius with the World',
    description: 'A modern blogging platform for sharing ideas, expertise, and stories.',
    siteName: 'Blogo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogo — Share Your Genius with the World',
    description: 'A modern blogging platform for sharing ideas, expertise, and stories.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-text)',
                borderRadius: '12px',
                border: '1px solid var(--toast-border)',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
