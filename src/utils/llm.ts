import { LLMResponse } from '../types';
import { getCurrentTimestamp } from '../lib/utils';

export const generateLLMResponseWithAPI = async (
  userMessage: string,
  apiKey: string,
  model: string = 'gpt-3.5-turbo'
): Promise<LLMResponse> => {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for customer support. Respond in a friendly, helpful, and professional manner.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText} - ${errorData}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.',
      timestamp: getCurrentTimestamp(),
    };
  } catch (error) {
    console.error('OpenAI API request failed:', error);
    throw error;
  }
};

export const validateApiKey = (apiKey: string): boolean => {
  return Boolean(apiKey && apiKey.trim().length > 0 && apiKey.trim().startsWith('sk-'));
};