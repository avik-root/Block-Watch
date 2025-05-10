
import type { Metadata } from 'next';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

// Metadata specific to pages in this auth group
export const metadata: Metadata = {
  title: 'BlockWatch AI Sentinel - Authentication',
  description: 'Secure Access to Your Decentralized Threat Detection Dashboard',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 shadow-sm backdrop-blur-md md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-primary" />
          <span className="text-lg font-semibold text-foreground">
            BlockWatch
          </span>
        </Link>
        <ThemeToggleButton />
      </header>
      <main className="flex-1"> {/* Pages will handle their own internal layout/centering and padding */}
        {children}
      </main>
    </div>
  );
}
