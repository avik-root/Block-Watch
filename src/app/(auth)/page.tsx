
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LogIn, Lock, Unlock, ChevronDown, ShieldCheck, Zap, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { FuturisticLogo } from "@/components/futuristic-logo";
import React, { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [scrollPhase, setScrollPhase] = useState<'hero' | 'unlocking' | 'unlocked'>('hero');
  const [parallaxScale, setParallaxScale] = useState(1);
  const unlockSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!unlockSectionRef.current) return;

      const unlockSectionTop = unlockSectionRef.current.offsetTop;
      const currentScrollY = window.scrollY;
      const currentWindowHeight = window.innerHeight;
      
      const scrollPosition = currentScrollY + currentWindowHeight * 0.75; 
      const heroThreshold = currentWindowHeight * 0.5; 
      const unlockedThreshold = unlockSectionTop; 

      setParallaxScale(1 + currentScrollY / 2000);

      if (currentScrollY < heroThreshold) {
        setScrollPhase('hero');
      } else if (currentScrollY >= heroThreshold && scrollPosition < unlockedThreshold) {
        setScrollPhase('unlocking');
      } else if (scrollPosition >= unlockedThreshold) {
        setScrollPhase('unlocked');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggleButton />
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${scrollPhase !== 'hero' ? 'opacity-30 blur-sm' : 'opacity-100'}`}
          style={{
            backgroundImage: `url('https://picsum.photos/1920/1080?random=hero&blur=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${parallaxScale})`, 
          }}
          data-ai-hint="abstract background"
        />
        <div className="absolute inset-0 bg-background/70 dark:bg-background/80 backdrop-blur-sm"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <FuturisticLogo className="w-28 h-28 md:w-36 md:h-36 text-primary mb-6 drop-shadow-lg" />
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight drop-shadow-md">
            BlockWatch AI Sentinel
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Your decentralized shield against smart contract threats. Real-time detection, proactive response, and unparalleled security for the blockchain ecosystem.
          </p>
          <div className={`transition-opacity duration-500 ${scrollPhase === 'hero' ? 'opacity-100' : 'opacity-0'}`}>
            <ChevronDown className="w-10 h-10 text-muted-foreground animate-bounce" />
            <p className="text-sm text-muted-foreground mt-2">Scroll to Unlock</p>
          </div>
        </div>
      </section>

      {/* Unlock Animation Section */}
      <section ref={unlockSectionRef} className="py-20 md:py-32 text-center bg-background relative">
        <div 
          className={`transition-all duration-1000 ease-in-out ${scrollPhase === 'hero' ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}
        >
          {scrollPhase === 'unlocking' || scrollPhase === 'hero' ? (
            <Lock className={`w-24 h-24 md:w-32 md:h-32 mx-auto text-primary mb-6 transition-all duration-700 ease-out ${scrollPhase === 'unlocking' ? 'opacity-50 animate-pulse scale-95' : 'opacity-70 scale-100'}`} />
          ) : (
            <Unlock className="w-24 h-24 md:w-32 md:h-32 mx-auto text-accent mb-6 transition-all duration-700 ease-out transform scale-110" />
          )}
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {scrollPhase === 'unlocked' ? "Secure Access Portal Unlocked" : "Initiating Secure Connection"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {scrollPhase === 'unlocked' ? "Proceed to sign in and fortify your digital assets." : "Revealing the gateway to your security dashboard..."}
          </p>
        </div>
      </section>
      
      {/* Sign In Section - Appears after "unlock" */}
      <section 
        className={`py-12 bg-background transition-all duration-1000 ease-out ${scrollPhase === 'unlocked' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
      >
        <div className="container mx-auto px-4 flex justify-center">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md transform hover:scale-[1.02]">
            <CardHeader className="text-center">
              <LogIn className="w-12 h-12 text-accent mx-auto mb-3" />
              <CardTitle className="text-2xl">
                Access Your Sentinel
              </CardTitle>
              <CardDescription>
                Sign in to access your personalized dashboard and threat intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Your journey to enhanced blockchain security starts here.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full text-lg py-6">
                <Link href="/signin">
                  Sign In Securely <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features Section - Why BlockWatch? */}
      <section className={`py-20 md:py-32 bg-secondary dark:bg-card transition-opacity duration-1000 ease-out ${scrollPhase === 'unlocked' ? 'opacity-100' : 'opacity-30'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-foreground mb-16">Why BlockWatch AI Sentinel?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Image
                src="https://picsum.photos/600/400?random=blockchain-security"
                alt="Blockchain Security Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl relative transform group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="blockchain security"
              />
            </div>
            <ul className="space-y-6 text-lg">
              {[
                { icon: ShieldCheck, title: "AI-Powered Detection", text: "Leverage cutting-edge AI to identify sophisticated threats, including flash loan attacks, rug pulls, and smart contract vulnerabilities." },
                { icon: Zap, title: "Real-Time Alerts", text: "Receive instant notifications on potential risks, enabling swift action to protect your assets." },
                { icon: Eye, title: "Comprehensive Analytics", text: "Gain deep insights from our intuitive dashboard, visualizing threat landscapes and risk scores." },
                { icon: FuturisticLogo, title: "Multi-Blockchain Support", text: "Monitor activities across major blockchains like Ethereum, BSC, and Polygon." }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 p-4 bg-card dark:bg-background rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <item.icon className={`w-8 h-8 ${item.icon === FuturisticLogo ? 'text-primary' : 'text-accent'} mt-1 shrink-0`} />
                  <div>
                    <h3 className="font-semibold text-xl mb-1 text-card-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-16 py-12 bg-background text-center text-muted-foreground text-sm px-4 border-t border-border">
        <p>&copy; {new Date().getFullYear()} BlockWatch AI Sentinel. All rights reserved.</p>
        <p>Innovating for a safer decentralized future.</p>
      </footer>
    </div>
  );
}
