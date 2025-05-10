
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const mockUsers = [
  { id: "user1", name: "Alice Wonderland", email: "alice@example.com" },
  { id: "user2", name: "Bob The Builder", email: "bob@example.com" },
  { id: "user3", name: "Charlie Brown", email: "charlie@example.com" },
];

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = (userName: string) => {
    // Mock sign-in logic
    console.log(`Attempting mock sign in as ${userName}...`);
    // Navigate to connect wallet page after "sign in"
    router.push("/connect-wallet");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 bg-background px-4"> {/* Adjusted min-h */}
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="w-16 h-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl">Sign In</CardTitle>
          <CardDescription>Choose a mock account to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockUsers.map((user, index) => (
            <Button 
              key={user.id}
              onClick={() => handleSignIn(user.name)} 
              className="w-full justify-start"
              variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}
            >
              <User className="mr-2 h-4 w-4" />
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
  );
}
