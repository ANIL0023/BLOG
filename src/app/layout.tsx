import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
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
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              gutter={8}
              containerStyle={{
                top: 40,
                right: 20,
                bottom: 40,
                left: 20,
              }}
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg, #fff)',
                  color: 'var(--toast-text, #1e293b)',
                  borderRadius: '16px',
                  border: '1px solid var(--toast-border, rgba(0,0,0,0.05))',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '12px 20px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  backdropFilter: 'blur(8px)',
                },
                success: {
                  style: {
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#10b981',
                  },
                },
                error: {
                  style: {
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                  },
                  iconTheme: {
                    primary: '#fff',
                    secondary: '#ef4444',
                  },
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
