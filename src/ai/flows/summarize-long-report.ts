'use server';

/**
 * @fileOverview A flow that summarizes the key points and insights from a detailed PDF report.
 *
 * - summarizeLongReport - A function that handles the summarization process.
 * - SummarizeLongReportInput - The input type for the summarizeLongReport function.
 * - SummarizeLongReportOutput - The return type for the summarizeLongReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLongReportInputSchema = z.object({
  reportText: z.string().describe('The text content of the detailed PDF report.'),
});
export type SummarizeLongReportInput = z.infer<typeof SummarizeLongReportInputSchema>;

const SummarizeLongReportOutputSchema = z.object({
  summary: z.string().describe('A summary of the key points and insights from the report.'),
});
export type SummarizeLongReportOutput = z.infer<typeof SummarizeLongReportOutputSchema>;

export async function summarizeLongReport(input: SummarizeLongReportInput): Promise<SummarizeLongReportOutput> {
  return summarizeLongReportFlow(input);
}

const summarizeLongReportPrompt = ai.definePrompt({
  name: 'summarizeLongReportPrompt',
  input: {schema: SummarizeLongReportInputSchema},
  output: {schema: SummarizeLongReportOutputSchema},
  prompt: `You are an expert summarizer. Please provide a concise summary of the following report. Focus on the key points and insights.

Report:
{{reportText}}`,
});

const summarizeLongReportFlow = ai.defineFlow(
  {
    name: 'summarizeLongReportFlow',
    inputSchema: SummarizeLongReportInputSchema,
    outputSchema: SummarizeLongReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeLongReportPrompt(input);
    return output!;
  }
);
