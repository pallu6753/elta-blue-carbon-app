'use server';
/**
 * @fileOverview An AI-powered MRV (Measurement, Reporting, and Verification) tool for project developers.
 *
 * - aiAssistedMRV - A function that takes in project details and generates a baseline MRV report.
 * - AiAssistedMRVInput - The input type for the aiAssistedMRV function.
 * - AiAssistedMRVOutput - The return type for the aiAssistedMRV function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAssistedMRVInputSchema = z.object({
  projectName: z.string().describe('The name of the blue carbon project.'),
  projectType: z.string().describe('The type of blue carbon project (e.g., Mangrove Restoration, Seagrass Conservation).'),
  projectLocation: z.string().describe('The location of the project (e.g., Sunderbans, Mahanadi Delta).'),
  projectTarget: z.number().describe('The estimated carbon capture target in tCO2e.'),
  satelliteDataUri: z
    .string()
    .describe(
      `Satellite data of the project area, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>' example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w+bK8JwYw0ACv....`
    ),
  baselineDataDescription: z.string().describe('Description of baseline data'),
});
export type AiAssistedMRVInput = z.infer<typeof AiAssistedMRVInputSchema>;

const AiAssistedMRVOutputSchema = z.object({
  reportSummary: z.string().describe('A summary of the generated MRV report, including key data points and findings.'),
  dataQualityAssessment: z.string().describe('An assessment of the quality and reliability of the data used in the report.'),
  suggestedImprovements: z.string().describe('Suggestions for improving data collection and reporting processes.'),
});
export type AiAssistedMRVOutput = z.infer<typeof AiAssistedMRVOutputSchema>;

export async function aiAssistedMRV(input: AiAssistedMRVInput): Promise<AiAssistedMRVOutput> {
  return aiAssistedMRVFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAssistedMRVPrompt',
  input: {schema: AiAssistedMRVInputSchema},
  output: {schema: AiAssistedMRVOutputSchema},
  prompt: `You are an expert in blue carbon MRV (Measurement, Reporting, and Verification). You will generate a baseline MRV report summary based on the provided project details and satellite data. 

  The generated MRV report must include a data quality assessment and suggest improvements to data collection and reporting processes.

  Project Name: {{{projectName}}}
  Project Type: {{{projectType}}}
  Project Location: {{{projectLocation}}}
  Project Target: {{{projectTarget}}} tCO2e
  Satellite Data: {{media url=satelliteDataUri}}
  Baseline Data Description: {{{baselineDataDescription}}}

  Ensure the report summary highlights key data points and findings related to carbon quantification.
`,
});

const aiAssistedMRVFlow = ai.defineFlow(
  {
    name: 'aiAssistedMRVFlow',
    inputSchema: AiAssistedMRVInputSchema,
    outputSchema: AiAssistedMRVOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
