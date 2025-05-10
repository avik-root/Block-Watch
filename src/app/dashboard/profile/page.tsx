
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, Mail, LogOut, ArrowLeft } from 'lucide-react'; // Renamed User to UserIcon
import type { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        router.push('/signin'); // Redirect if no user found
      }
      setLoading(false);
    }
  }, [router]);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    router.push('/signin');
  };

  if (loading || !isMounted) {
    return (
      <div className="flex justify-center items-start pt-10 px-4">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-10 w-full mt-6" />
            <Skeleton className="h-10 w-full mt-2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    // This case should ideally be handled by the redirect, but as a fallback:
    return <div className="text-center p-10">User not found. Please sign in.</div>;
  }

  return (
    <div className="flex justify-center items-start pt-10 px-4">
      <Card className={`w-full max-w-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:scale-[1.01] ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <CardHeader className="items-center text-center">
          <Avatar className={`w-24 h-24 mb-4 text-6xl border-2 border-primary hover:ring-4 hover:ring-primary/50 transition-all duration-300`}>
            {currentUser.avatarUrl ? (
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="user avatar"/>
            ) : (
              <UserIcon className="w-16 h-16 text-muted-foreground m-auto" />
            )}
            <AvatarFallback className="text-3xl">
              {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{currentUser.name}</CardTitle>
          <CardDescription>Your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
            <UserIcon className="h-5 w-5 text-primary" />
            <span className="text-md font-medium text-foreground">
              Name: {currentUser.name}
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-md font-medium text-foreground">
              Email: {currentUser.email}
            </span>
          </div>
          <Button asChild variant="outline" className="w-full mt-6 hover:brightness-105 active:scale-95 transition-all">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
           <Button onClick={handleSignOut} variant="destructive" className="w-full hover:brightness-110 active:scale-95 transition-all">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
