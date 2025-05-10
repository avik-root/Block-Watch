'use server';

/**
 * @fileOverview Summarizes the potential risks associated with a smart contract.
 *
 * - summarizeContractRisk - A function that takes a smart contract address and returns a summary of its potential risks.
 * - SummarizeContractRiskInput - The input type for the summarizeContractRisk function.
 * - SummarizeContractRiskOutput - The return type for the summarizeContractRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContractRiskInputSchema = z.object({
  contractAddress: z.string().describe('The address of the smart contract to analyze.'),
});
export type SummarizeContractRiskInput = z.infer<typeof SummarizeContractRiskInputSchema>;

const SummarizeContractRiskOutputSchema = z.object({
  summary: z.string().describe('A summary of the potential risks associated with the smart contract.'),
});
export type SummarizeContractRiskOutput = z.infer<typeof SummarizeContractRiskOutputSchema>;

export async function summarizeContractRisk(input: SummarizeContractRiskInput): Promise<SummarizeContractRiskOutput> {
  return summarizeContractRiskFlow(input);
}

const summarizeContractRiskPrompt = ai.definePrompt({
  name: 'summarizeContractRiskPrompt',
  input: {schema: SummarizeContractRiskInputSchema},
  output: {schema: SummarizeContractRiskOutputSchema},
  prompt: `You are a security expert specializing in smart contract risk assessment. Review the smart contract at the provided address and summarize the potential risks associated with the contract.\n\nContract Address: {{{contractAddress}}}\n\nProvide a detailed summary of the risks, including potential vulnerabilities, exploits, and other security concerns. Focus on clarity and accuracy to help developers quickly assess the safety of the contract.`,  
});

const summarizeContractRiskFlow = ai.defineFlow(
  {
    name: 'summarizeContractRiskFlow',
    inputSchema: SummarizeContractRiskInputSchema,
    outputSchema: SummarizeContractRiskOutputSchema,
  },
  async input => {
    const {output} = await summarizeContractRiskPrompt(input);
    return output!;
  }
);
