import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ShieldCheck, LayoutDashboard, Settings, Code2, UserCircle } from 'lucide-react';
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon" className="border-r border-sidebar-border">
            <SidebarHeader className="p-4 border-b border-sidebar-border">
              <Link href="/" className="flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-sidebar-primary" />
                <span className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                  BlockWatch
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={true} tooltip="Dashboard">
                    <Link href="/">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="API Access">
                    <Link href="#"> {/* Placeholder Link */}
                      <Code2 />
                      <span>API Access</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="#"> {/* Placeholder Link */}
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            {/* Optional Footer Example
            <SidebarFooter className="p-2 border-t border-sidebar-border">
              <SidebarMenuButton tooltip="User Profile">
                <UserCircle />
                <span>User Name</span>
              </SidebarMenuButton>
            </SidebarFooter>
            */}
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/90 px-4 shadow-sm backdrop-blur-md md:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold text-foreground">Threat Dashboard</h1>
              </div>
              {/* Placeholder for user actions / theme toggle */}
              <div className="flex items-center gap-2">
                <UserCircle className="h-8 w-8 text-muted-foreground" />
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
