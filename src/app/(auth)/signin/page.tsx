
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User as UserIcon } from "lucide-react"; // Renamed User to UserIcon to avoid conflict
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import type { User } from "@/types/user";
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const mockUsers: User[] = [
  { id: "user1", name: "Alice Wonderland", email: "alice@example.com", avatarUrl: "https://picsum.photos/seed/alice/40/40" },
  { id: "user2", name: "Bob The Builder", email: "bob@example.com", avatarUrl: "https://picsum.photos/seed/bob/40/40" },
  { id: "user3", name: "Charlie Brown", email: "charlie@example.com", avatarUrl: "https://picsum.photos/seed/charlie/40/40" },
  { id: "user4", name: "Diana Prince", email: "diana@example.com", avatarUrl: "https://picsum.photos/seed/diana/40/40"},
  { id: "user5", name: "Edward Scissorhands", email: "edward@example.com", avatarUrl: "https://picsum.photos/seed/edward/40/40"},
];

export default function SignInPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignIn = (user: User) => {
    console.log(`Attempting mock sign in as ${user.name}...`);
    // Store user in localStorage to simulate session
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    // Navigate to connect wallet page after "sign in"
    router.push("/connect-wallet");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>
      <div className="group [perspective:1000px]">
        <Card 
          className={cn(
            "w-full max-w-md shadow-xl transition-all duration-500 ease-out",
            "transform group-hover:[transform:rotateY(1.5deg)_scale(1.02)] group-hover:shadow-2xl",
            isMounted ? 'opacity-100 translate-y-0 !duration-700' : 'opacity-0 translate-y-10 !duration-0'
          )}
        >
          <CardHeader className="text-center">
            <LogIn className="w-16 h-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl">Sign In</CardTitle>
            <CardDescription>Choose a mock account to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUsers.map((user, index) => (
              <Button 
                key={user.id}
                onClick={() => handleSignIn(user)} 
                className="w-full justify-start hover:brightness-110 active:scale-95 transition-all"
                variant={index % 3 === 0 ? "default" : index % 3 === 1 ? "secondary" : "outline"}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Sign In as {user.name}
              </Button>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              This is a mock sign-in. No actual authentication is performed.
            </p>
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
