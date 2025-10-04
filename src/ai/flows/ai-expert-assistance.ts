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

Answer the following question: {{{query}}}`,
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
