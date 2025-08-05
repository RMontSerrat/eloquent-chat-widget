import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChatStore } from '../../store/chatStore';
import { validateApiKey } from '../../utils/llm';
import { formatTimestamp } from '../../lib/utils';

// Mock framer-motion to avoid animation issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Chat Widget - Essential Tests', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useChatStore.getState();
    store.clearMessages();
    store.closeWidget();
    store.setError(null);
    store.setOnlineStatus(true);
    store.setMaintenanceMode(false);
  });

  describe('Main Store', () => {
    it('should have correct initial state', () => {
      const store = useChatStore.getState();
      
      expect(store.isOpen).toBe(false);
      expect(store.isOnline).toBe(true);
      expect(store.messages).toHaveLength(0);
      expect(store.error).toBeNull();
      expect(store.config).toBeDefined();
    });

    it('should open and close the widget', () => {
      const { openWidget, closeWidget } = useChatStore.getState();
      
      openWidget();
      expect(useChatStore.getState().isOpen).toBe(true);
      
      closeWidget();
      expect(useChatStore.getState().isOpen).toBe(false);
    });

    it('should add messages', () => {
      const { addMessage } = useChatStore.getState();
      
      addMessage({
        content: 'Test message',
        sender: 'user',
      });
      
      const state = useChatStore.getState();
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0].content).toBe('Test message');
      expect(state.messages[0].sender).toBe('user');
      expect(state.messages[0].id).toBeDefined();
      expect(state.messages[0].timestamp).toBeInstanceOf(Date);
    });

    it('should update configuration', () => {
      const { updateConfig } = useChatStore.getState();
      
      updateConfig({
        primaryColor: '#ff0000',
        placeholder: 'New message...',
        position: 'top-left',
      });
      
      const state = useChatStore.getState();
      expect(state.config.primaryColor).toBe('#ff0000');
      expect(state.config.placeholder).toBe('New message...');
      expect(state.config.position).toBe('top-left');
    });

    it('should manage error states', () => {
      const { setError, setOnlineStatus, setMaintenanceMode } = useChatStore.getState();
      
      setError('Test error');
      expect(useChatStore.getState().error).toBe('Test error');
      
      setOnlineStatus(false);
      expect(useChatStore.getState().isOnline).toBe(false);
      
      setMaintenanceMode(true);
      expect(useChatStore.getState().isMaintenanceMode).toBe(true);
    });

    it('should clear messages', () => {
      const { addMessage, clearMessages } = useChatStore.getState();
      
      addMessage({ content: 'Test 1', sender: 'user' });
      addMessage({ content: 'Test 2', sender: 'assistant' });
      
      expect(useChatStore.getState().messages).toHaveLength(2);
      
      clearMessages();
      expect(useChatStore.getState().messages).toHaveLength(0);
    });
  });

  describe('Utilities', () => {
    it('should validate API keys correctly', () => {
      expect(validateApiKey('sk-1234567890abcdef')).toBe(true);
      expect(validateApiKey('sk-proj-1234567890')).toBe(true);
      expect(validateApiKey('invalid-key')).toBe(false);
      expect(validateApiKey('')).toBe(false);
      expect(validateApiKey('pk-1234567890')).toBe(false);
    });

    it('should format timestamps', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 2 * 60 * 1000); // 2 min ago
      
      expect(formatTimestamp(now)).toBe('Just now');
      expect(formatTimestamp(recent)).toMatch(/\d+m ago/);
    });
  });

  describe('Basic Flow', () => {
    it('should work complete message cycle', async () => {
      const { addMessage, openWidget, closeWidget } = useChatStore.getState();
      
      // 1. Open widget
      openWidget();
      expect(useChatStore.getState().isOpen).toBe(true);
      
      // 2. Add user message
      addMessage({
        content: 'Hello, I need help',
        sender: 'user',
      });
      
      // 3. Verify message was added
      let state = useChatStore.getState();
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0].content).toBe('Hello, I need help');
      
      // 4. Simulate assistant response
      addMessage({
        content: 'Hello! How can I help?',
        sender: 'assistant',
      });
      
      // 5. Verify complete conversation
      state = useChatStore.getState();
      expect(state.messages).toHaveLength(2);
      expect(state.messages[1].sender).toBe('assistant');
      
      // 6. Close widget
      closeWidget();
      expect(useChatStore.getState().isOpen).toBe(false);
    });

    it('should block sending when offline', async () => {
      const { sendMessage, setOnlineStatus } = useChatStore.getState();
      
      setOnlineStatus(false);
      
      await sendMessage('Test message');
      
      const state = useChatStore.getState();
      expect(state.messages).toHaveLength(0); // Should not add message
      expect(state.error).toContain('offline');
    });

    it('should block sending during maintenance', async () => {
      const { sendMessage, setMaintenanceMode } = useChatStore.getState();
      
      setMaintenanceMode(true);
      
      await sendMessage('Test message');
      
      const state = useChatStore.getState();
      expect(state.messages).toHaveLength(0);
      expect(state.error).toContain('maintenance');
    });
  });

  describe('Configuration', () => {
    it('should apply custom configurations', () => {
      const { updateConfig } = useChatStore.getState();
      
      const customConfig = {
        primaryColor: '#00ff00',
        secondaryColor: '#0000ff',
        placeholder: 'Type your message here...',
        welcomeMessage: 'Welcome to chat!',
        position: 'bottom-left' as const,
        maxMessages: 50,
        enablePersistence: false,
        typingIndicatorDelay: 500,
      };
      
      updateConfig(customConfig);
      
      const state = useChatStore.getState();
      expect(state.config.primaryColor).toBe('#00ff00');
      expect(state.config.secondaryColor).toBe('#0000ff');
      expect(state.config.placeholder).toBe('Type your message here...');
      expect(state.config.welcomeMessage).toBe('Welcome to chat!');
      expect(state.config.position).toBe('bottom-left');
      expect(state.config.maxMessages).toBe(50);
      expect(state.config.enablePersistence).toBe(false);
      expect(state.config.typingIndicatorDelay).toBe(500);
    });

    it('should respect maximum message limit', () => {
      const { updateConfig, addMessage } = useChatStore.getState();
      
      updateConfig({ maxMessages: 2 });
      
      addMessage({ content: 'Message 1', sender: 'user' });
      addMessage({ content: 'Message 2', sender: 'user' });
      addMessage({ content: 'Message 3', sender: 'user' });
      
      const state = useChatStore.getState();
      expect(state.messages).toHaveLength(2);
      expect(state.messages[0].content).toBe('Message 2');
      expect(state.messages[1].content).toBe('Message 3');
    });
  });
});