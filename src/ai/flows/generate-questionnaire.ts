'use server';

/**
 * @fileOverview Generates a tailored questionnaire using AI based on a user-provided topic and desired length.
 *
 * - generateQuestionnaire - A function that generates the questionnaire.
 * - GenerateQuestionnaireInput - The input type for the generateQuestionnaire function.
 * - GenerateQuestionnaireOutput - The return type for the generateQuestionnaire function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionnaireInputSchema = z.object({
  topic: z.string().describe('The topic of the questionnaire.'),
  length: z.enum(['concise', 'complete']).describe('The desired length of the questionnaire (concise or complete).'),
});
export type GenerateQuestionnaireInput = z.infer<typeof GenerateQuestionnaireInputSchema>;

const GenerateQuestionnaireOutputSchema = z.object({
  questionnaire: z.string().describe('The generated questionnaire in a suitable format (e.g., markdown).'),
});
export type GenerateQuestionnaireOutput = z.infer<typeof GenerateQuestionnaireOutputSchema>;

export async function generateQuestionnaire(input: GenerateQuestionnaireInput): Promise<GenerateQuestionnaireOutput> {
  return generateQuestionnaireFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionnairePrompt',
  input: {
    schema: GenerateQuestionnaireInputSchema,
  },
  output: {
    schema: GenerateQuestionnaireOutputSchema,
  },
  prompt: `You are an expert in generating questionnaires for self-assessment.

  Based on the topic: {{{topic}}},
  and the desired length: {{{length}}},
  generate a questionnaire that helps users assess their suitability.

  The questionnaire should be formatted as a markdown list.

  Each question should be clear and concise, and designed to elicit a thoughtful response.

  Ensure the questionnaire covers various dimensions of suitability relevant to the topic.

  The total score should be set to 100.

  Consider including these dimensions:
  - Motivation & Purpose
  - Research Skills & Thinking Disposition
  - Self-Regulation & Perseverance
  - Psychological Capital & Resilience
  - Interpersonal & Communication Skills
  - Academic Integrity & Values
  - Environment & Support System
  - Career Orientation & Future Vision
  - Self-Reflection & Readiness`,
});

const generateQuestionnaireFlow = ai.defineFlow(
  {
    name: 'generateQuestionnaireFlow',
    inputSchema: GenerateQuestionnaireInputSchema,
    outputSchema: GenerateQuestionnaireOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
