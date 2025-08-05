import { useCallback, useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { ChatWidgetConfig } from '../types';
import { formatTimestamp, isRecentMessage, getCurrentTimestamp } from '../lib/utils';

export const useChat = () => {
  const store = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [store.messages, store.isTyping, scrollToBottom]);

  // Handle message submission
  const handleSendMessage = useCallback(async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    
    if (!messageToSend || isSubmitting) return;
    
    if (store.isMaintenanceMode) {
      store.setError(store.config.maintenanceMessage || 'Service is under maintenance');
      return;
    }
    
    if (!store.isOnline) {
      store.setError(store.config.offlineMessage || 'Service is currently offline');
      return;
    }

    setIsSubmitting(true);
    setInputValue('');
    
    try {
      await store.sendMessage(messageToSend);
    } catch (error) {
      console.error('Failed to send message:', error);
      store.setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [inputValue, isSubmitting, store]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Clear error after timeout
  useEffect(() => {
    if (store.error) {
      const timeout = setTimeout(() => {
        store.setError(null);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [store.error, store]);

  // Use imported utility functions for date operations

  return {
    // State
    ...store,
    inputValue,
    isSubmitting,
    messagesEndRef,
    
    // Actions
    setInputValue,
    handleSendMessage,
    handleKeyDown,
    scrollToBottom,
    
    // Utilities
    formatTimestamp,
    isRecentMessage,
    
    // Computed values
    canSendMessage: !isSubmitting && !store.isLoading && store.isOnline && !store.isMaintenanceMode,
    hasMessages: store.messages.length > 0,
    unreadCount: store.messages.filter(msg => 
      msg.sender === 'assistant' && 
      !store.isOpen && 
      isRecentMessage(msg.timestamp) &&
      msg.content !== store.config.welcomeMessage
    ).length,
  };
};

export const useChatConfig = () => {
  const { config, updateConfig } = useChatStore();
  
  const updateMode = useCallback((mode: 'light' | 'dark') => {
    updateConfig({ mode });
  }, [updateConfig]);
  
  const updateColors = useCallback((primaryColor: string, secondaryColor?: string) => {
    updateConfig({ 
      primaryColor,
      ...(secondaryColor && { secondaryColor })
    });
  }, [updateConfig]);
  
  const updateTexts = useCallback((texts: {
    placeholder?: string;
    welcomeMessage?: string;
    offlineMessage?: string;
    maintenanceMessage?: string;
  }) => {
    updateConfig(texts);
  }, [updateConfig]);
  
  const updateSettings = useCallback((settings: {
    enablePersistence?: boolean;
    maxMessages?: number;
    typingIndicatorDelay?: number;
    position?: ChatWidgetConfig['position'];
  }) => {
    updateConfig(settings);
  }, [updateConfig]);
  
  return {
    config,
    updateConfig,
    updateMode,
    updateColors,
    updateTexts,
    updateSettings,
  };
};

export const useChatPersistence = () => {
  const { loadFromStorage, saveToStorage, clearStorage, config } = useChatStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const save = useCallback(async () => {
    if (!config.enablePersistence) return;
    
    setIsLoading(true);
    try {
      saveToStorage();
      setLastSaved(getCurrentTimestamp());
    } catch (error) {
      console.error('Failed to save chat data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [saveToStorage, config.enablePersistence]);
  
  const load = useCallback(async () => {
    if (!config.enablePersistence) return;
    
    setIsLoading(true);
    try {
      loadFromStorage();
    } catch (error) {
      console.error('Failed to load chat data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadFromStorage, config.enablePersistence]);
  
  const clear = useCallback(async () => {
    setIsLoading(true);
    try {
      clearStorage();
      setLastSaved(null);
    } catch (error) {
      console.error('Failed to clear chat data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [clearStorage]);
  
  return {
    isLoading,
    lastSaved,
    save,
    load,
    clear,
    isEnabled: config.enablePersistence,
  };
};