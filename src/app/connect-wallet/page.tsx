'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConnectWalletPage() {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false); // Mock state

  const handleConnectWallet = (walletName: string) => {
    // Mock wallet connection logic
    console.log(`Attempting to connect with ${walletName}...`);
    setIsWalletConnected(true); 
    // In a real app, you would use a library like wagmi or ethers.js
  };

  const handleProceed = () => {
    if (isWalletConnected) {
      router.push("/dashboard");
    } else {
      // Optionally, show a toast or message to connect wallet first
      alert("Please connect a wallet to proceed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl">Connect Your Wallet</CardTitle>
          <CardDescription>
            Securely connect your preferred crypto wallet to access the dashboard and manage your assets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isWalletConnected ? (
            <div className="flex flex-col items-center gap-4 p-6 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              <p className="text-lg font-medium text-green-700 dark:text-green-300">Wallet Connected Successfully!</p>
              <p className="text-sm text-muted-foreground text-center">
                You can now proceed to your dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center justify-center gap-2 text-lg"
                onClick={() => handleConnectWallet("MetaMask")}
              >
                <Image src="https://picsum.photos/40/40?random=metamask" alt="MetaMask" width={24} height={24} data-ai-hint="fox logo" className="rounded-sm"/>
                MetaMask
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center justify-center gap-2 text-lg"
                onClick={() => handleConnectWallet("WalletConnect")}
              >
                 <Image src="https://picsum.photos/40/40?random=walletconnect" alt="WalletConnect" width={24} height={24} data-ai-hint="blue logo" className="rounded-sm"/>
                WalletConnect
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-20 flex flex-col items-center justify-center gap-2 text-lg sm:col-span-2"
                onClick={() => handleConnectWallet("Other Wallet")}
              >
                <Wallet className="w-6 h-6" />
                Other Wallet
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleProceed} 
            className="w-full"
            disabled={!isWalletConnected && false} // Enable proceed button even if not connected for mock flow
          >
            Proceed to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Link href="/signin" className="text-sm text-primary hover:underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
