
import type { Metadata } from 'next';

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
    <div className="flex min-h-screen flex-col animated-gradient-background">
      {/* Header removed */}
      <main className="flex-1"> {/* Pages will handle their own internal layout/centering and padding */}
        {children}
      </main>
    </div>
  );
}
