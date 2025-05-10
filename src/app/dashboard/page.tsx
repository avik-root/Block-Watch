
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertTriangle,
  FileText,
  Search,
  Eye,
  Copy,
  BarChart3,
} from 'lucide-react';
import { ThreatScoreBadge } from '@/components/threat-score-badge';
import { ThreatIcon } from '@/components/threat-icon';
import type { Threat, FlaggedEntity } from '@/types/threat';
import type { User } from '@/types/user';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react'; // Corrected import

const baseMockThreats: Threat[] = [
  { id: '1', type: 'Flash Loan Attack', address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', threatScore: 85, timestamp: new Date(Date.now() - 3600000).toISOString(), description: 'Suspiciously large flash loan detected, potential market manipulation.', blockchain: 'Ethereum', rawDetails: 'Function: flashLoan(...)\nParameters: amount=100000ETH, asset=ETH, target=0x123...\nGas used: 250000' },
  { id: '2', type: 'Honeypot', address: '0x1234567890abcdef1234567890abcdef12345678', threatScore: 92, timestamp: new Date(Date.now() - 7200000).toISOString(), description: 'Contract appears to trap funds, multiple failed withdrawals.', blockchain: 'BSC', rawDetails: 'Contract Source (partial):\nmodifier onlyOwner() {\n  require(msg.sender == owner, "Not owner");\n  // No way to change owner or withdraw for non-owner\n  _; \n}' },
  { id: '3', type: 'Rugpull', address: '0xDeadBeefDeadBeefDeadBeefDeadBeefDeadBeef01', threatScore: 99, timestamp: new Date(Date.now() - 10800000).toISOString(), description: 'Sudden liquidity removal and token dump by deployer.', blockchain: 'Polygon', rawDetails: 'Transaction Hash: 0xabcdef12345...\nDeployer Address: 0xDeployer...\nActions: removeLiquidity, transfer large amount of tokens to CEX.' },
  { id: '4', type: 'Bot/Drainer', address: '0xBadBotBadBotBadBotBadBotBadBotBadBot02', threatScore: 78, timestamp: new Date(Date.now() - 14400000).toISOString(), description: 'Automated script interacting with multiple wallets, draining small amounts.', blockchain: 'Ethereum', rawDetails: 'Interacted with 50+ wallets in the last hour. Typical transaction involves approving token spend and then transferring out.' },
  { id: '5', type: 'Smart Contract Vulnerability', address: '0xVulnerableContractVulnerableContract03', threatScore: 65, timestamp: new Date(Date.now() - 18000000).toISOString(), description: 'Potential reentrancy vulnerability identified in withdraw function.', blockchain: 'BSC', rawDetails: 'Function: withdraw(...)\n// Code snippet showing potential reentrancy\n  IERC20(token).transfer(msg.sender, amount);\n  balances[msg.sender] -= amount;' },
  { id: '6', type: 'Flash Loan Attack', address: '0xAnotherFlashLoanAttackAddressExample', threatScore: 70, timestamp: new Date(Date.now() - 21600000).toISOString(), description: 'Secondary flash loan attack targeting a different protocol.', blockchain: 'Polygon', rawDetails: 'Details specific to this attack.' },
];

const baseMockFlaggedEntities: FlaggedEntity[] = [
  { id: 'e1', address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', entityType: 'Wallet', overallThreatScore: 85, lastThreatType: 'Flash Loan Attack', threatHistoryCount: 3, blockchain: 'Ethereum', tags: ['High Activity', 'Market Manipulator'], firstSeen: new Date(Date.now() - 86400000 * 5).toISOString(), lastSeen: new Date(Date.now() - 3600000).toISOString() },
  { id: 'e2', address: '0x1234567890abcdef1234567890abcdef12345678', entityType: 'Contract', overallThreatScore: 92, lastThreatType: 'Honeypot', threatHistoryCount: 1, blockchain: 'BSC', tags: ['Scam', 'Funds Locker'], firstSeen: new Date(Date.now() - 86400000 * 2).toISOString(), lastSeen: new Date(Date.now() - 7200000).toISOString() },
  { id: 'e3', address: '0xDeployerAddressForRugPullContract', entityType: 'Wallet', overallThreatScore: 99, lastThreatType: 'Rugpull', threatHistoryCount: 5, blockchain: 'Polygon', tags: ['Scammer', 'Token Dumper'], firstSeen: new Date(Date.now() - 86400000 * 10).toISOString(), lastSeen: new Date(Date.now() - 10800000).toISOString() },
  { id: 'e4', address: '0xYetAnotherFlaggedWalletOrContract', entityType: 'Contract', overallThreatScore: 70, lastThreatType: 'Smart Contract Vulnerability', threatHistoryCount: 2, blockchain: 'Ethereum', tags: ['Vulnerable', 'Needs Audit'], firstSeen: new Date(Date.now() - 86400000 * 3).toISOString(), lastSeen: new Date(Date.now() - 18000000).toISOString() },
];


const chartData = [
  { threatType: "Flash Loan", count: 12, fill: "var(--color-flashLoan)" },
  { threatType: "Honeypot", count: 25, fill: "var(--color-honeypot)" },
  { threatType: "Rugpull", count: 8, fill: "var(--color-rugpull)" },
  { threatType: "Bot/Drainer", count: 18, fill: "var(--color-botDrainer)" },
  { threatType: "SC Vuln", count: 5, fill: "var(--color-scVuln)" },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  flashLoan: { label: "Flash Loan", color: "hsl(var(--chart-1))" },
  honeypot: { label: "Honeypot", color: "hsl(var(--chart-2))" },
  rugpull: { label: "Rugpull", color: "hsl(var(--chart-3))" },
  botDrainer: { label: "Bot/Drainer", color: "hsl(var(--chart-4))" },
  scVuln: { label: "SC Vuln", color: "hsl(var(--chart-5))" },
} satisfies import("@/components/ui/chart").ChartConfig


export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        router.push('/signin'); // Redirect if no user found
      }
    }
  }, [router]);
  
  const mockThreats = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.id === 'user1') return baseMockThreats; // Alice sees all
    if (currentUser.id === 'user2') return baseMockThreats.slice(0, 4); // Bob sees 4
    if (currentUser.id === 'user3') return baseMockThreats.slice(0, 3); // Charlie sees 3
    return baseMockThreats.slice(1, 5); // Others see a different subset
  }, [currentUser]);

  const mockFlaggedEntities = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.id === 'user1') return baseMockFlaggedEntities.slice(0,2); // Alice sees 2
    if (currentUser.id === 'user2') return baseMockFlaggedEntities; // Bob sees all
    return baseMockFlaggedEntities.slice(1,3); // Others see a different subset
  }, [currentUser]);


  const filteredThreats = useMemo(() => 
    mockThreats.filter(threat => 
      threat.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.type.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, mockThreats]);

  const filteredFlaggedEntities = useMemo(() =>
    mockFlaggedEntities.filter(entity =>
      entity.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm, mockFlaggedEntities]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: text,
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
      console.error('Failed to copy text: ', err);
    });
  };
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !currentUser) {
    // Render a placeholder or skeleton for SSR, then full content on client
    // Or if currentUser is not yet loaded
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-foreground">Threat Dashboard</h1>
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div> {/* Search bar placeholder */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="shadow-lg h-32 bg-muted animate-pulse"></Card>
          ))}
        </div>
        <Card className="shadow-lg h-96 bg-muted animate-pulse"></Card> {/* Recent Threats placeholder */}
         <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <Card className="shadow-lg h-80 bg-muted animate-pulse"></Card> {/* Flagged Entities placeholder */}
            <Card className="shadow-lg h-80 bg-muted animate-pulse"></Card> {/* Threat Distribution placeholder */}
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold text-foreground">Threat Dashboard for {currentUser.name}</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by address, threat type, or description..."
          className="w-full rounded-lg bg-card pl-10 pr-4 py-3 text-base shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats Detected</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{mockThreats.length}</div>
            <p className="text-xs text-muted-foreground">+ {mockThreats.length > 3 ? 2 : 1} in last 24 hours for you</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Entities</CardTitle>
            <ShieldAlert className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {mockFlaggedEntities.filter(e => e.overallThreatScore >= 75).length}
            </div>
            <p className="text-xs text-muted-foreground">Actively monitored by you</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contracts Scanned</CardTitle>
            <FileText className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,250,345</div>
            <p className="text-xs text-muted-foreground">+10k today</p>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supported Blockchains</CardTitle>
            <BarChart3 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">ETH, BSC, Polygon</p>
          </CardContent>
        </Card>
      </div>
      
      <AlertDialog> 
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <Card className="shadow-lg col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Threats</CardTitle>
              <CardDescription>Live feed of detected malicious activities and vulnerabilities relevant to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead className="w-[50px]">Type</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="w-[120px]">Blockchain</TableHead>
                      <TableHead className="w-[120px]">Score</TableHead>
                      <TableHead className="w-[150px]">Timestamp</TableHead>
                      <TableHead className="w-[80px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredThreats.map((threat) => (
                      <TableRow key={threat.id} className="hover:bg-muted/50">
                        <TableCell>
                          <ThreatIcon type={threat.type} className="h-5 w-5 text-accent" />
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span>{`${threat.address.substring(0, 8)}...${threat.address.substring(threat.address.length - 6)}`}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToClipboard(threat.address)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{threat.blockchain}</TableCell>
                        <TableCell>
                          <ThreatScoreBadge score={threat.threatScore} />
                        </TableCell>
                        <TableCell>{new Date(threat.timestamp).toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedThreat(threat)}>
                              <Eye className="h-4 w-4 mr-1 md:mr-2" />
                              <span className="hidden md:inline">View</span>
                            </Button>
                          </AlertDialogTrigger>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Flagged Entities</CardTitle>
              <CardDescription>Wallets and contracts with notable threat history relevant to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead>Address</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Last Threat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFlaggedEntities.map((entity) => (
                      <TableRow key={entity.id} className="hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span>{`${entity.address.substring(0, 8)}...${entity.address.substring(entity.address.length - 6)}`}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyToClipboard(entity.address)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{entity.entityType}</TableCell>
                        <TableCell>
                          <ThreatScoreBadge score={entity.overallThreatScore} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ThreatIcon type={entity.lastThreatType} className="h-4 w-4 text-muted-foreground" />
                            {entity.lastThreatType}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
              <CardDescription>Overview of threat types detected.</CardDescription>
            </CardHeader>
            <CardContent className="aspect-[16/9]">
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="threatType" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="count" radius={4} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      
        {selectedThreat && (
          <AlertDialogContent className="max-w-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <ThreatIcon type={selectedThreat.type} className="h-6 w-6 text-accent" />
                  Threat Details: {selectedThreat.type}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Detailed information about the detected threat.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4 py-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address:</h3>
                    <p className="font-mono text-sm text-muted-foreground bg-muted p-2 rounded-md flex items-center justify-between">
                      {selectedThreat.address}
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopyToClipboard(selectedThreat.address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Blockchain:</h3>
                    <p className="text-sm text-muted-foreground">{selectedThreat.blockchain}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Threat Score:</h3>
                    <ThreatScoreBadge score={selectedThreat.threatScore} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Timestamp:</h3>
                    <p className="text-sm text-muted-foreground">{new Date(selectedThreat.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Description:</h3>
                    <p className="text-sm text-muted-foreground">{selectedThreat.description}</p>
                  </div>
                  {selectedThreat.rawDetails && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Raw Details:</h3>
                      <pre className="text-xs text-muted-foreground bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
                        {selectedThreat.rawDetails}
                      </pre>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setSelectedThreat(null)}>Close</AlertDialogCancel>
                {/* <AlertDialogAction>Take Action</AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}
