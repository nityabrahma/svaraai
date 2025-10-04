'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically scoring leads based on validation and enrichment data.
 *
 * - automaticallyScoreLeads - A function that handles the lead scoring process.
 * - AutomaticallyScoreLeadsInput - The input type for the automaticallyScoreLeads function.
 * - AutomaticallyScoreLeadsOutput - The return type for the automaticallyScoreLeads function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomaticallyScoreLeadsInputSchema = z.object({
  leadId: z.string().describe('The ID of the lead to score.'),
  validationData: z.record(z.any()).describe('Validation data for the lead.'),
  enrichmentData: z.record(z.any()).describe('Enrichment data for the lead.'),
});
export type AutomaticallyScoreLeadsInput = z.infer<typeof AutomaticallyScoreLeadsInputSchema>;

const AutomaticallyScoreLeadsOutputSchema = z.object({
  score: z.number().describe('The calculated score for the lead (0-100).'),
  reasoning: z.string().describe('Explanation of how the score was determined.'),
});
export type AutomaticallyScoreLeadsOutput = z.infer<typeof AutomaticallyScoreLeadsOutputSchema>;

export async function automaticallyScoreLeads(input: AutomaticallyScoreLeadsInput): Promise<AutomaticallyScoreLeadsOutput> {
  return automaticallyScoreLeadsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automaticallyScoreLeadsPrompt',
  input: {schema: AutomaticallyScoreLeadsInputSchema},
  output: {schema: AutomaticallyScoreLeadsOutputSchema},
  prompt: `You are an expert lead scorer. Given the validation and enrichment data for a lead, you will assign a quality score between 0 and 100.

Validation Data: {{{validationData}}}
Enrichment Data: {{{enrichmentData}}}

Provide a score and a brief explanation of your reasoning. Consider data recency, completeness, and reliability when determining the score.
High scores should represent leads that are likely to convert into valuable customers.
Low scores should represent leads that likely are invalid or low value.
Ensure that the score and reasoning are related, and that the reasoning justifies the score.`,
});

const automaticallyScoreLeadsFlow = ai.defineFlow(
  {
    name: 'automaticallyScoreLeadsFlow',
    inputSchema: AutomaticallyScoreLeadsInputSchema,
    outputSchema: AutomaticallyScoreLeadsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
