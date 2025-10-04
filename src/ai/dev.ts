import { config } from 'dotenv';
config();

import '@/ai/flows/enrich-lead-data-with-llm.ts';
import '@/ai/flows/automatically-score-leads.ts';