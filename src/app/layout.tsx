
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { ShieldCheck, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BlockWatch AI Sentinel',
  description: 'Decentralized Threat Detection & Response System for Smart Contracts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* This header is for non-auth pages like Dashboard */}
          {/* Auth pages (/ , /signin, /connect-wallet) use (auth)/layout.tsx for their header */}
          <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 shadow-sm backdrop-blur-md md:px-6">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                BlockWatch
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggleButton />
              {/* UserCircle might be conditionally shown based on auth state in a real app */}
              <UserCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
