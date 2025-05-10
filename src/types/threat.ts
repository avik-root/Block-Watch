import type { ThreatType } from "@/components/threat-icon";

export type Blockchain = 'Ethereum' | 'BSC' | 'Polygon' | 'Other';

export interface Threat {
  id: string;
  type: ThreatType;
  address: string; 
  threatScore: number; // 0-100
  timestamp: string; // ISO date string
  description: string;
  blockchain: Blockchain;
  rawDetails?: string; // For instance, the raw contract code or transaction data
}

export interface FlaggedEntity {
  id: string;
  address: string;
  entityType: 'Wallet' | 'Contract';
  overallThreatScore: number;
  lastThreatType: ThreatType;
  threatHistoryCount: number;
  blockchain: Blockchain;
  tags: string[]; // e.g., "Phishing", "Exploiter"
  firstSeen: string; // ISO date string
  lastSeen: string; // ISO date string
}
