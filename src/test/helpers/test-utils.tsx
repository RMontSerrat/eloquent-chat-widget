import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ChatWidgetProvider } from '../../components/ChatWidgetProvider';
import { ChatWidgetConfig } from '../../types';

const defaultConfig: Partial<ChatWidgetConfig> = {
  placeholder: 'Test placeholder',
  welcomeMessage: 'Test welcome message',
  enablePersistence: false, // Disable persistence by default in tests
  typingIndicatorDelay: 100, // Faster for tests
  openaiApiKey: 'test-api-key',
  openaiModel: 'gpt-3.5-turbo',
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  config?: Partial<ChatWidgetConfig>;
}

const AllTheProviders = ({ 
  children, 
  config = {} 
}: { 
  children: React.ReactNode;
  config?: Partial<ChatWidgetConfig>;
}) => {
  return (
    <ChatWidgetProvider config={{ ...defaultConfig, ...config }}>
      {children}
    </ChatWidgetProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { config, ...renderOptions } = options;
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders config={config}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
export { userEvent };

// Custom matchers and utilities
export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 200));

export const createMockMessage = (
  content: string = 'Test message',
  sender: 'user' | 'assistant' = 'user',
  overrides: Record<string, any> = {}
) => ({
  id: `mock-${Math.random()}`,
  content,
  sender,
  timestamp: new Date(),
  ...overrides,
});

export const mockLocalStorage = () => {
  const storage: Record<string, string> = {};
  
  return {
    getItem: vi.fn((key: string) => storage[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete storage[key];
    }),
    clear: vi.fn(() => {
      Object.keys(storage).forEach(key => delete storage[key]);
    }),
    get storage() { return { ...storage }; }
  };
};