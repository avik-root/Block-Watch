
'use client';

import Link from 'next/link';
import { UserCircle, ShieldAlert as ShieldAlertIconLucide } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ShieldAlertIconLucide className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              BlockWatch
            </span>
          </Link>
          <nav className="flex-1">
            {/* Add dashboard navigation items here if needed later */}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            <Link href="/dashboard/profile" passHref legacyBehavior>
              <a className={`p-2 rounded-full ${pathname === '/dashboard/profile' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
                 aria-label="User Profile">
                <UserCircle className="h-7 w-7" />
              </a>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
