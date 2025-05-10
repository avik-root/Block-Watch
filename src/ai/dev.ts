import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-contract-risk.ts';
import '@/ai/flows/detect-anomalous-transactions.ts';
import '@/ai/flows/detect-phishing-attempt.ts';
