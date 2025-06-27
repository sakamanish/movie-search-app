import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { ThemeInitializer } from '@/components/providers/ThemeInitializer';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MovieDB - Discover Amazing Movies',
  description: 'Search and discover movies with detailed information and ratings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeInitializer>
            <div className="min-h-screen bg-background">
              <Header />
              <main>{children}</main>
            </div>
            <Toaster />
          </ThemeInitializer>
        </StoreProvider>
      </body>
    </html>
  );
}