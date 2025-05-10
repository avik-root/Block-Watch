'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, ArrowRight, LogIn, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-background">
      <header className="text-center mb-12">
        <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-foreground mb-3">
          BlockWatch AI Sentinel
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your decentralized shield against smart contract threats. Real-time detection, proactive response, and unparalleled security for the blockchain ecosystem.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mb-16">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="w-6 h-6 text-accent" />
              Secure Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Begin by securely signing in to access your personalized dashboard and threat intelligence.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signin">
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-accent" />
              Wallet Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect your preferred wallet to monitor assets and interact securely with dApps.
            </p>
          </CardContent>
           <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link href="/connect-wallet">
                Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-accent" />
              Threat Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dive into comprehensive threat analysis and manage your smart contract security.
            </p>
          </CardContent>
          <CardFooter>
             <Button asChild className="w-full">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <section className="w-full max-w-5xl p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-card-foreground mb-6">Why BlockWatch?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="https://picsum.photos/600/400?random=1"
              alt="Blockchain Security Illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
              data-ai-hint="blockchain security"
            />
          </div>
          <ul className="space-y-4 text-card-foreground">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary mt-1 shrink-0" />
              <span><strong>AI-Powered Detection:</strong> Leverage cutting-edge AI to identify sophisticated threats, including flash loan attacks, rug pulls, and smart contract vulnerabilities.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary mt-1 shrink-0" />
              <span><strong>Real-Time Alerts:</strong> Receive instant notifications on potential risks, enabling swift action to protect your assets.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary mt-1 shrink-0" />
              <span><strong>Comprehensive Analytics:</strong> Gain deep insights from our intuitive dashboard, visualizing threat landscapes and risk scores.</span>
            </li>
             <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary mt-1 shrink-0" />
              <span><strong>Multi-Blockchain Support:</strong> Monitor activities across major blockchains like Ethereum, BSC, and Polygon.</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} BlockWatch AI Sentinel. All rights reserved.</p>
        <p>Innovating for a safer decentralized future.</p>
      </footer>
    </div>
  );
}
