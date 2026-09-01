import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fanpanda | Luxury Creator Club & Subscription Platform',
  description: 'Connect with elite creators, unlock exclusive photos, 4K videos, VIP membership tiers, and live broadcasts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="bg-dark-bg text-slate-100 font-sans antialiased min-h-screen selection:bg-brand-500 selection:text-white" suppressHydrationWarning>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181924]/40 via-dark-bg to-dark-bg">
            <Navbar />
            <div className="flex-1 flex max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6">
              <Sidebar />
              <main className="flex-1 pb-24 lg:pb-12 min-w-0 px-2 sm:px-4 pt-4">
                {children}
              </main>
            </div>
            <MobileNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
