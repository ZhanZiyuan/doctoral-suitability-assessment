import { config } from 'dotenv';
config();

import '@/ai/flows/generate-questionnaire.ts';
import '@/ai/flows/interpret-assessment-results.ts';
import '@/ai/flows/summarize-long-report.ts';