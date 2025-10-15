
'use server';

import { interpretAssessmentResults } from '@/ai/flows/interpret-assessment-results';
import type { InterpretAssessmentResultsInput } from '@/ai/flows/interpret-assessment-results';

export async function getInterpretation(
  scores: InterpretAssessmentResultsInput
) {
  try {
    const result = await interpretAssessmentResults(scores);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting interpretation:', error);
    // It's better to return a generic error message to the client
    return { success: false, error: 'An error occurred while generating the interpretation. Please try again.' };
  }
}
