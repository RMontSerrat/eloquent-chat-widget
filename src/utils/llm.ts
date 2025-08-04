import { LLMResponse } from '../types';

// Mock LLM responses for demonstration
const mockResponses = [
  "I'd be happy to help you with that! Can you provide more details?",
  "That's a great question. Let me think about the best way to assist you.",
  "Thank you for reaching out. I understand your concern and I'm here to help.",
  "I see what you're looking for. Here's what I recommend...",
  "That's definitely something we can help with. Let me provide you with some options.",
  "I appreciate you contacting us. Based on what you've described, here's my suggestion...",
  "Thanks for your patience. I've looked into this and here's what I found...",
  "That's a common question, and I'm glad you asked. Here's how we can solve this...",
  "I understand your situation. Let me walk you through the steps to resolve this.",
  "Great point! Here's some additional information that might be helpful...",
];

const responseTemplates = {
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Welcome! I'm here to help. What's on your mind?",
  ],
  help: [
    "I'm here to help! What specific question do you have?",
    "Of course! I'd be glad to assist. What do you need help with?",
    "Absolutely! Tell me more about what you're looking for.",
  ],
  technical: [
    "For technical issues, I'll need a bit more information. Can you describe what's happening?",
    "Let me help you troubleshoot this. What steps have you already tried?",
    "Technical problems can be tricky. Can you provide more details about the issue?",
  ],
  pricing: [
    "I'd be happy to discuss our pricing options with you. What specific plan are you interested in?",
    "Great question about pricing! Let me get you the most up-to-date information.",
    "For pricing details, I can connect you with our sales team or provide some general information. What would you prefer?",
  ],
  default: mockResponses,
};

const getResponseCategory = (message: string): keyof typeof responseTemplates => {
  const lowerMessage = message.toLowerCase();
  
  if (
    lowerMessage.includes('hello') || 
    lowerMessage.includes('hi') || 
    lowerMessage.includes('hey')
  ) {
    return 'greeting';
  }
  
  if (
    lowerMessage.includes('help') || 
    lowerMessage.includes('assist') || 
    lowerMessage.includes('support')
  ) {
    return 'help';
  }
  
  if (
    lowerMessage.includes('error') || 
    lowerMessage.includes('bug') || 
    lowerMessage.includes('problem') || 
    lowerMessage.includes('issue') ||
    lowerMessage.includes('technical')
  ) {
    return 'technical';
  }
  
  if (
    lowerMessage.includes('price') || 
    lowerMessage.includes('cost') || 
    lowerMessage.includes('pricing') ||
    lowerMessage.includes('plan') ||
    lowerMessage.includes('subscription')
  ) {
    return 'pricing';
  }
  
  return 'default';
};

const getRandomResponse = (responses: string[]): string => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Simulate API call delay
const simulateApiDelay = (): Promise<void> => {
  const delay = Math.random() * 1000 + 500; // 500-1500ms
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const generateLLMResponse = async (userMessage: string): Promise<LLMResponse> => {
  try {
    await simulateApiDelay();
    
    const category = getResponseCategory(userMessage);
    const responses = responseTemplates[category];
    const content = getRandomResponse(responses);
    
    return {
      content,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error generating LLM response:', error);
    return {
      content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date(),
    };
  }
};

// Future: Replace with actual LLM API integration
export const generateLLMResponseWithAPI = async (
  userMessage: string,
  apiKey?: string,
  apiEndpoint?: string
): Promise<LLMResponse> => {
  if (!apiKey || !apiEndpoint) {
    return generateLLMResponse(userMessage);
  }

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: userMessage,
        model: 'gpt-3.5-turbo', // or configurable model
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices?.[0]?.message?.content || 'No response from API',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('API request failed, falling back to mock response:', error);
    return generateLLMResponse(userMessage);
  }
};

export const validateApiKey = (apiKey: string): boolean => {
  return Boolean(apiKey && apiKey.length > 0 && apiKey.startsWith('sk-'));
};