import {genkit, GenerationCommonConfig} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const handlebarsEqHelper = (a: any, b: any) => {
  return a === b;
};

const generationConfig: GenerationCommonConfig = {
  template: {
    helpers: {
      eq: handlebarsEqHelper,
    },
  },
};

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  generationConfig,
});
