import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock OpenAI API
  http.post('https://api.openai.com/v1/chat/completions', () => {
    return HttpResponse.json({
      id: 'chatcmpl-123',
      object: 'chat.completion',
      created: 1677652288,
      model: 'gpt-3.5-turbo',
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: 'This is a mocked AI response for testing purposes.'
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21
      }
    });
  }),

  // Mock error response for testing error handling
  http.post('https://api.openai.com/v1/chat/completions', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('error') === 'true') {
      return new HttpResponse(
        JSON.stringify({ error: { message: 'API Error for testing' } }),
        { status: 500 }
      );
    }
  }),
];