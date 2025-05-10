// Detects anomalous transactions on the blockchain using GenAI.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @fileOverview This file defines a Genkit flow for detecting anomalous transactions on the blockchain.
 *
 * - detectAnomalousTransactions - A function that takes transaction data as input and returns an analysis of whether the transaction is anomalous.
 * - DetectAnomalousTransactionsInput - The input type for the detectAnomalousTransactions function.
 * - DetectAnomalousTransactionsOutput - The return type for the detectAnomalousTransactions function.
 */

const DetectAnomalousTransactionsInputSchema = z.object({
  transactionMetadata: z
    .string()
    .describe('Metadata about the transaction, including timestamp, gas used, and involved parties.'),
  valueTransferred: z.number().describe('The amount of value transferred in the transaction.'),
  smartContractInteractions: z
    .string()
    .describe('Details about any smart contract interactions during the transaction.'),
});

export type DetectAnomalousTransactionsInput = z.infer<typeof DetectAnomalousTransactionsInputSchema>;

const DetectAnomalousTransactionsOutputSchema = z.object({
  isAnomalous: z.boolean().describe('Whether the transaction is considered anomalous.'),
  anomalyScore: z.number().describe('A score indicating the degree of anomaly (0-100).'),
  explanation: z.string().describe('An explanation of why the transaction is considered anomalous.'),
});

export type DetectAnomalousTransactionsOutput = z.infer<typeof DetectAnomalousTransactionsOutputSchema>;

export async function detectAnomalousTransactions(
  input: DetectAnomalousTransactionsInput
): Promise<DetectAnomalousTransactionsOutput> {
  return detectAnomalousTransactionsFlow(input);
}

const detectAnomalousTransactionsPrompt = ai.definePrompt({
  name: 'detectAnomalousTransactionsPrompt',
  input: {schema: DetectAnomalousTransactionsInputSchema},
  output: {schema: DetectAnomalousTransactionsOutputSchema},
  prompt: `You are a blockchain security analyst tasked with identifying anomalous transactions.

  Analyze the following transaction data to determine if it is anomalous. Provide an anomaly score between 0 and 100, and explain your reasoning.

  Transaction Metadata: {{{transactionMetadata}}}
  Value Transferred: {{{valueTransferred}}}
  Smart Contract Interactions: {{{smartContractInteractions}}}

  Consider factors such as unusual transaction patterns, large value transfers, and suspicious smart contract interactions.

  Return the isAnomalous field as true if the anomaly score is above 70.
  `,
});

const detectAnomalousTransactionsFlow = ai.defineFlow(
  {
    name: 'detectAnomalousTransactionsFlow',
    inputSchema: DetectAnomalousTransactionsInputSchema,
    outputSchema: DetectAnomalousTransactionsOutputSchema,
  },
  async input => {
    const {output} = await detectAnomalousTransactionsPrompt(input);
    return output!;
  }
);
