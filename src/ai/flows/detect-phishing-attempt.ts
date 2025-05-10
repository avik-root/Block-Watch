'use server';
/**
 * @fileOverview A Genkit flow for detecting phishing attempts from URLs or email content.
 *
 * - detectPhishingAttempt - A function that analyzes input for phishing indicators.
 * - DetectPhishingAttemptInput - The input type for the detectPhishingAttempt function.
 * - DetectPhishingAttemptOutput - The return type for the detectPhishingAttempt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPhishingAttemptInputSchema = z.object({
  url: z.string().optional().describe('The URL to analyze for phishing risks. Expected format: "https://example.com/path"'),
  emailContent: z.string().optional().describe('The full raw content of an email to analyze for phishing indicators, including headers and body.'),
  senderAddress: z.string().optional().describe('The declared sender email address from the email headers.'),
  subjectLine: z.string().optional().describe('The subject line of the email.'),
});
export type DetectPhishingAttemptInput = z.infer<typeof DetectPhishingAttemptInputSchema>;

const DetectPhishingAttemptOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the input is determined to be a phishing attempt.'),
  confidenceScore: z.number().min(0).max(100).describe('A score from 0 to 100 indicating the confidence in the phishing determination (higher means more confident it is phishing).'),
  explanation: z.string().describe('A detailed explanation of why the input is or is not considered a phishing attempt, highlighting specific indicators.'),
  redFlags: z.array(z.string()).describe('A list of specific red flags identified in the input that point towards phishing.'),
  suggestedActions: z.array(z.string()).optional().describe('Recommended actions for the user if phishing is suspected (e.g., "Do not click links", "Report the email").'),
});
export type DetectPhishingAttemptOutput = z.infer<typeof DetectPhishingAttemptOutputSchema>;

export async function detectPhishingAttempt(input: DetectPhishingAttemptInput): Promise<DetectPhishingAttemptOutput> {
  if (!input.url && !input.emailContent) {
    throw new Error("Either a URL or email content must be provided for phishing detection.");
  }
  return detectPhishingAttemptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectPhishingAttemptPrompt',
  input: {schema: DetectPhishingAttemptInputSchema},
  output: {schema: DetectPhishingAttemptOutputSchema},
  prompt: `You are an AI cybersecurity analyst specializing in phishing detection.
  Analyze the provided information to determine if it constitutes a phishing attempt.

  Consider the following:
  - URL analysis: domain age, suspicious subdomains, typosquatting, HTTPS usage, known malicious domains, URL shorteners leading to suspicious sites.
  - Email content analysis: sender reputation, "From" address spoofing, urgent or threatening language, requests for sensitive information (credentials, financial details), poor grammar/spelling, suspicious attachments or links, generic greetings, mismatched reply-to addresses.
  - Presence of known phishing patterns or keywords.

  Input:
  {{#if url}}URL to analyze: {{{url}}}{{/if}}
  {{#if senderAddress}}Sender Email: {{{senderAddress}}}{{/if}}
  {{#if subjectLine}}Email Subject: {{{subjectLine}}}{{/if}}
  {{#if emailContent}}
  Email Content (including headers if available):
  ---
  {{{emailContent}}}
  ---
  {{/if}}

  Based on your analysis:
  1. Determine if this is a phishing attempt (isPhishing: true/false).
  2. Provide a confidence score (0-100) for your determination. Set a higher score if it is clearly phishing.
  3. Explain your reasoning in detail, pointing out specific indicators (explanation).
  4. List specific red flags identified (redFlags).
  5. If it is phishing or highly suspicious (confidenceScore > 60), suggest appropriate actions for the user (suggestedActions). Examples: "Do not click any links.", "Do not download attachments.", "Report this email to your IT department.", "Delete the email immediately.", "Verify the request through a separate, trusted communication channel."

  If very little information is provided or the information is too generic to make a confident assessment, lean towards a lower confidence score for phishing and explain the ambiguity.
  If a URL is provided, focus on URL-based red flags. If email content is provided, focus on content, sender, and subject red flags. If both, consider all.
  `,
});

const detectPhishingAttemptFlow = ai.defineFlow(
  {
    name: 'detectPhishingAttemptFlow',
    inputSchema: DetectPhishingAttemptInputSchema,
    outputSchema: DetectPhishingAttemptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure output is not null, though definePrompt should handle this with a valid schema
    if (!output) {
        // This case should ideally not be reached if the LLM respects the output schema.
        // However, as a fallback:
        console.error("Phishing detection flow received null output from prompt.");
        return {
            isPhishing: false,
            confidenceScore: 0,
            explanation: "Failed to analyze input due to an unexpected error with the AI model response.",
            redFlags: ["Model response error"],
        };
    }
    return output;
  }
);
