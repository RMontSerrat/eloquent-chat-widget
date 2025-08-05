import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatStore, ChatMessage, ChatWidgetConfig } from '../types';
import { generateLLMResponseWithAPI } from '../utils/llm';
import { 
  loadChatFromStorage, 
  saveChatToStorage, 
  clearChatStorage 
} from '../utils/storage';
import { getCurrentTimestamp } from '../lib/utils';

const defaultConfig: ChatWidgetConfig = {
  placeholder: 'Type your message...',
  position: 'bottom-right',
  mode: 'light',
  enablePersistence: true,
  maxMessages: 100,
  typingIndicatorDelay: 1000,
  offlineMessage: 'We\'re currently offline. Leave us a message and we\'ll get back to you!',
  maintenanceMessage: 'Our chat service is temporarily under maintenance. Please try again later.',
  welcomeMessage: 'Hello! How can we help you today?',
  primaryColor: '#6f33b7',
  secondaryColor: '#64748b',
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  openaiModel: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
};

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  id: uuidv4(),
  isOpen: false,
  isOnline: true,
  isMaintenanceMode: false,
  messages: [],
  user: null,
  isTyping: false,
  isLoading: false,
  error: null,
  config: defaultConfig,
  onMessageCallback: undefined,

  // Widget control actions
  openWidget: () => {
    set({ isOpen: true });
    const { saveToStorage } = get();
    saveToStorage();
  },

  closeWidget: () => {
    set({ isOpen: false });
    const { saveToStorage } = get();
    saveToStorage();
  },

  toggleWidget: () => {
    const { isOpen, openWidget, closeWidget } = get();
    isOpen ? closeWidget() : openWidget();
  },

  // Message actions
  sendMessage: async (content: string) => {
    const { 
      isMaintenanceMode, 
      isOnline, 
      addMessage, 
      setTyping, 
      setError, 
      setLoading,
      config 
    } = get();

    if (isMaintenanceMode) {
      setError('Chat is currently under maintenance');
      return;
    }

    if (!isOnline) {
      setError('Chat is currently offline');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Add user message
      addMessage({
        content,
        sender: 'user',
      });

      // Show typing indicator
      setTyping(true);

      // Simulate AI response delay
      await new Promise(resolve => 
        setTimeout(resolve, config.typingIndicatorDelay || 1000)
      );

      // Generate AI response using OpenAI API
      const response = await generateLLMResponseWithAPI(
        content, 
        config.openaiApiKey || '', 
        config.openaiModel || 'gpt-3.5-turbo'
      );
      
      setTyping(false);

      // Add AI response
      addMessage({
        content: response.content,
        sender: 'assistant',
      });

    } catch (error) {
      setTyping(false);
      setError(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  },

  addMessage: (message) => {
    const { messages, config, saveToStorage, onMessageCallback } = get();
    
    const newMessage: ChatMessage = {
      ...message,
      id: uuidv4(),
      timestamp: getCurrentTimestamp(),
    };

    const updatedMessages = [...messages, newMessage];
    
    // Respect max messages limit
    const maxMessages = config.maxMessages || 100;
    if (updatedMessages.length > maxMessages) {
      updatedMessages.splice(0, updatedMessages.length - maxMessages);
    }

    set({ messages: updatedMessages });
    saveToStorage();
    
    // Call the onMessage callback if provided
    if (onMessageCallback) {
      onMessageCallback(newMessage);
    }
  },

  clearMessages: () => {
    set({ messages: [] });
    const { saveToStorage } = get();
    saveToStorage();
  },

  // Status actions
  setOnlineStatus: (isOnline) => {
    set({ isOnline });
    const { saveToStorage } = get();
    saveToStorage();
  },

  setMaintenanceMode: (isMaintenanceMode) => {
    set({ isMaintenanceMode });
    const { saveToStorage } = get();
    saveToStorage();
  },

  setTyping: (isTyping) => {
    set({ isTyping });
  },

  // User actions
  setUser: (user) => {
    set({ user });
    const { saveToStorage } = get();
    saveToStorage();
  },

  updateUser: (updates) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
      const { saveToStorage } = get();
      saveToStorage();
    }
  },

  // Configuration actions
  updateConfig: (configUpdates) => {
    const { config } = get();
    set({ config: { ...config, ...configUpdates } });
    const { saveToStorage } = get();
    saveToStorage();
  },

  // Persistence actions
  loadFromStorage: () => {
    const { config } = get();
    if (config.enablePersistence) {
      const savedData = loadChatFromStorage();
      if (savedData) {
        set({
          ...savedData,
          isTyping: false, // Always reset typing state on load
          isLoading: false, // Always reset loading state on load
        });
      }
    }
  },

  saveToStorage: () => {
    const { config, isTyping, isLoading, ...stateToSave } = get();
    if (config.enablePersistence) {
      saveChatToStorage(stateToSave);
    }
  },

  clearStorage: () => {
    clearChatStorage();
    set({
      messages: [],
      user: null,
      isOpen: false,
      error: null,
    });
  },

  // Error handling actions
  setError: (error) => {
    set({ error });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // Callback actions
  setOnMessageCallback: (callback) => {
    set({ onMessageCallback: callback });
  },
}));

// Initialize from storage when store is created
if (typeof window !== 'undefined') {
  useChatStore.getState().loadFromStorage();
  
  // Add welcome message if no messages exist
  const { messages, addMessage, config } = useChatStore.getState();
  if (messages.length === 0 && config.welcomeMessage) {
    addMessage({
      content: config.welcomeMessage,
      sender: 'assistant',
    });
  }
}