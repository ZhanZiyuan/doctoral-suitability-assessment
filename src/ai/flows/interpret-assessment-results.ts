'use server';

/**
 * @fileOverview This file defines a Genkit flow for interpreting the results of the Doctoral Suitability Self-Assessment Questionnaire.
 *
 * The flow takes the user's assessment scores as input and provides AI-driven interpretive feedback,
 * highlighting strengths and areas for improvement based on established psychological models and research.
 *
 * @module interpret-assessment-results
 * @exports interpretAssessmentResults - The main function to trigger the assessment interpretation flow.
 * @exports InterpretAssessmentResultsInput - The input type for the interpretAssessmentResults function.
 * @exports InterpretAssessmentResultsOutput - The output type for the interpretAssessmentResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the assessment results.
const InterpretAssessmentResultsInputSchema = z.object({
  motivationAndPurpose: z.number().describe('Average score for the Motivation & Purpose dimension.'),
  researchSkillsAndThinking: z.number().describe('Average score for the Research Skills & Thinking dimension.'),
  selfRegulationAndPerseverance: z.number().describe('Average score for the Self-Regulation & Perseverance dimension.'),
  psychologicalCapitalAndResilience: z.number().describe('Average score for the Psychological Capital & Resilience dimension.'),
  interpersonalAndCommunication: z.number().describe('Average score for the Interpersonal & Communication Skills dimension.'),
  academicIntegrityAndValues: z.number().describe('Average score for the Academic Integrity & Values dimension.'),
  environmentAndSupportSystem: z.number().describe('Average score for the Environment & Support System dimension.'),
  careerOrientationAndFuture: z.number().describe('Average score for the Career Orientation & Future Vision dimension.'),
  selfReflectionAndReadiness: z.number().describe('Average score for the Self-Reflection & Readiness dimension.'),
  totalScore: z.number().describe('The total score of the assessment.'),
});

export type InterpretAssessmentResultsInput = z.infer<typeof InterpretAssessmentResultsInputSchema>;

// Define the output schema for the interpreted feedback.
const InterpretAssessmentResultsOutputSchema = z.object({
  overallFeedback: z.string().describe('Overall interpretive feedback based on the total score.'),
  strengths: z.string().describe('Highlighted strengths based on high-scoring dimensions.'),
  areasForImprovement: z.string().describe('Areas for improvement based on low-scoring dimensions.'),
});

export type InterpretAssessmentResultsOutput = z.infer<typeof InterpretAssessmentResultsOutputSchema>;

// Exported function to call the flow
export async function interpretAssessmentResults(input: InterpretAssessmentResultsInput): Promise<InterpretAssessmentResultsOutput> {
  return interpretAssessmentResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretAssessmentResultsPrompt',
  input: {schema: InterpretAssessmentResultsInputSchema},
  output: {schema: InterpretAssessmentResultsOutputSchema},
  prompt: `You are an AI assessment interpreter, specializing in providing personalized feedback
  based on the results of a Doctoral Suitability Self-Assessment Questionnaire. You will analyze the provided scores across various dimensions to provide an overall assessment, highlight key strengths,
  and identify areas where the user could focus on improving their readiness for doctoral studies.

  Consider established psychological models (e.g., Self-Determination Theory, Psychological Capital) and research on doctoral student success factors when formulating your feedback.

  Here are the assessment scores:
  - Motivation and Purpose: {{{motivationAndPurpose}}}
  - Research Skills and Thinking: {{{researchSkillsAndThinking}}}
  - Self-Regulation and Perseverance: {{{selfRegulationAndPerseverance}}}
  - Psychological Capital and Resilience: {{{psychologicalCapitalAndResilience}}}
  - Interpersonal and Communication Skills: {{{interpersonalAndCommunication}}}
  - Academic Integrity and Values: {{{academicIntegrityAndValues}}}
  - Environment and Support System: {{{environmentAndSupportSystem}}}
  - Career Orientation and Future Vision: {{{careerOrientationAndFuture}}}
  - Self-Reflection and Readiness: {{{selfReflectionAndReadiness}}}
  - Total Score: {{{totalScore}}}

  Based on these scores, provide:
  1.  Overall Feedback (overallFeedback): A concise summary of the user's suitability for doctoral studies based on their total score. Mention generally what a high, medium, or low score would indicate.
  2. Strengths (strengths): Identify 2-3 key strengths based on the highest-scoring dimensions.
  Explain why these strengths are important for doctoral success. Be specific about how these strengths can help the user in their PhD journey.
  3. Areas for Improvement (areasForImprovement): Identify 2-3 areas where the user could focus on improving. Provide actionable advice on how they can develop these areas. Explain the relevance of these areas to PhD success.

  Ensure the feedback is encouraging, constructive, and actionable. Tailor the feedback to the specific scores provided, and don't just provide generic advice.
  Use a professional and supportive tone.
  `,
});

const interpretAssessmentResultsFlow = ai.defineFlow(
  {
    name: 'interpretAssessmentResultsFlow',
    inputSchema: InterpretAssessmentResultsInputSchema,
    outputSchema: InterpretAssessmentResultsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
