import { Flame, Zap, TrendingDown, Bot, HelpCircle, ShieldAlert, type LucideProps } from "lucide-react";

export type ThreatType = 'Honeypot' | 'Flash Loan Attack' | 'Rugpull' | 'Bot/Drainer' | 'Smart Contract Vulnerability' | 'Unknown';

interface ThreatIconProps extends LucideProps {
  type: ThreatType;
}

export function ThreatIcon({ type, ...props }: ThreatIconProps) {
  switch (type) {
    case 'Honeypot':
      return <Flame {...props} />;
    case 'Flash Loan Attack':
      return <Zap {...props} />;
    case 'Rugpull':
      return <TrendingDown {...props} />;
    case 'Bot/Drainer':
      return <Bot {...props} />;
    case 'Smart Contract Vulnerability':
      return <ShieldAlert {...props} />
    case 'Unknown':
    default:
      return <HelpCircle {...props} />;
  }
}
