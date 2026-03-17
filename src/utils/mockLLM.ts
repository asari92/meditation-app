export type Mood = 'calm' | 'tired' | 'energy';

import { getRandomFallbackAffirmation } from '../data/affirmations';

const API_URL = 'https://tiny-backend-a3iw.onrender.com/api/affirmation';

// Simple logger for React Native environment
const logger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[AFFIRMATION] ${message}`, ...args);
  }
};

export async function generateAffirmation(mood: Mood): Promise<string> {
  logger.log(`Starting request for mood: ${mood}`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood }),
    });

    logger.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      logger.log(`Request failed with status ${response.status}, using fallback`);
      throw new Error('Backend request failed');
    }

    const data = await response.json();
    logger.log(`Response data:`, data);

    if (!data?.text || typeof data.text !== 'string') {
      logger.log(`Invalid response data (missing or invalid text field), using fallback`);
      return getRandomFallbackAffirmation(mood);
    }

    logger.log(`✅ Successfully got affirmation from API: "${data.text}"`);
    return data.text;
  } catch (error) {
    logger.log(`❌ Request error: ${error instanceof Error ? error.message : 'Unknown error'}, using fallback`);
    return getRandomFallbackAffirmation(mood);
  }
}
