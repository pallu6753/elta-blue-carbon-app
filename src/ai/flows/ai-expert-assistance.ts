'use server';

/**
 * @fileOverview Provides AI expert assistance for answering user questions about MRV, carbon credits, and blue carbon projects.
 *
 * - aiExpertAssistance - A function that handles the AI expert assistance process.
 * - AiExpertAssistanceInput - The input type for the aiExpertAssistance function.
 * - AiExpertAssistanceOutput - The return type for the aiExpertAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiExpertAssistanceInputSchema = z.object({
  query: z.string().describe('The user query about MRV, carbon credits, or blue carbon projects.'),
  role: z.string().optional().describe('The role of the user (e.g., Project Developer, Verifier, Investor, Regulator).'),
});
export type AiExpertAssistanceInput = z.infer<typeof AiExpertAssistanceInputSchema>;

const AiExpertAssistanceOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user query.'),
  sources: z.array(z.object({
    uri: z.string().optional().describe('The source URI.'),
    title: z.string().optional().describe('The source title.'),
  })).describe('The sources used to generate the answer.'),
});
export type AiExpertAssistanceOutput = z.infer<typeof AiExpertAssistanceOutputSchema>;

export async function aiExpertAssistance(input: AiExpertAssistanceInput): Promise<AiExpertAssistanceOutput> {
  return aiExpertAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiExpertAssistancePrompt',
  input: {schema: AiExpertAssistanceInputSchema},
  output: {schema: AiExpertAssistanceOutputSchema},
  prompt: `You are elta.eco's expert Climate Tech Analyst AI. Your goal is to provide concise, professional, and highly knowledgeable answers about blockchain-based carbon certification, MRV, and sustainable development on decentralized networks.

{{#if role}}
  {{#if (eq role "Project Developer")}}
    Focus on answering questions related to project registration, MRV data submission requirements, and credit issuance timelines.
  {{/if}}
  {{#if (eq role "Verifier")}}
    Focus on answering questions related to verification protocols, risk assessment, fraud detection, and regulatory compliance in carbon markets.
  {{/if}}
  {{#if (eq role "Investor")}}
    Focus on answering questions related to carbon credit market dynamics, blue carbon investment risks, portfolio management, and tokenized asset liquidity.
  {{/if}}
  {{#if (eq role "Regulator")}}
    Focus on answering questions related to carbon market policy, compliance frameworks, auditing, and global climate governance standards.
  {{/if}}
{{/if}}

Answer the following question: {{{query}}}`,
  config: {
    model: 'googleai/gemini-2.5-flash',
    template: {
      helpers: {
        eq: (a: any, b: any) => a === b,
      },
    },
  },
});

const aiExpertAssistanceFlow = ai.defineFlow(
  {
    name: 'aiExpertAssistanceFlow',
    inputSchema: AiExpertAssistanceInputSchema,
    outputSchema: AiExpertAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
