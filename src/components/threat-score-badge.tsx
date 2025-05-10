import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ThreatScoreBadgeProps {
  score: number;
  className?: string;
}

export function ThreatScoreBadge({ score, className }: ThreatScoreBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let text = "Low";

  if (score >= 75) {
    variant = "destructive";
    text = "Critical";
  } else if (score >= 50) {
    // Using outline for medium, can customize further if new variants are added
    variant = "outline"; 
    text = "Medium";
     // Custom style for medium - orange like
    className = cn(className, "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400");
  } else if (score >= 25) {
    variant = "secondary";
    text = "Low";
  } else {
    variant = "default"; // Or a success variant if available, for now 'default'
    text = "Minimal";
     // Custom style for minimal - green like
    className = cn(className, "border-green-500 text-green-600 bg-green-100 dark:bg-green-900 dark:border-green-400 dark:text-green-400");
  }

  return (
    <Badge variant={variant} className={cn("font-semibold", className)}>
      {text} ({score})
    </Badge>
  );
}
