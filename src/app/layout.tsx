import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'Sponzy - Premium Creator Subscription Platform',
  description: 'Connect with your favorite creators, enjoy exclusive photos, videos, stories, and live broadcasts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-dark-bg text-slate-100 min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex max-w-7xl w-full mx-auto">
              <Sidebar />
              <main className="flex-1 pb-20 lg:pb-8 min-w-0">
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
