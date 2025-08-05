import { ChatState } from '../types';
import { getCurrentTimestamp } from '../lib/utils';

const STORAGE_KEY = 'eloquent-chat-widget';

export const loadChatFromStorage = (): Partial<ChatState> | null => {
  try {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    
    // Convert timestamp strings back to Date objects
    if (data.messages) {
      data.messages = data.messages.map((message: any) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      }));
    }
    
    if (data.lastSeen) {
      data.lastSeen = new Date(data.lastSeen);
    }

    return data;
  } catch (error) {
    console.warn('Failed to load chat data from storage:', error);
    return null;
  }
};

export const saveChatToStorage = (data: Partial<ChatState>): void => {
  try {
    if (typeof window === 'undefined') return;
    
    const dataToStore = {
      ...data,
      lastSeen: getCurrentTimestamp(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.warn('Failed to save chat data to storage:', error);
  }
};

export const clearChatStorage = (): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear chat storage:', error);
  }
};

export const getStorageSize = (): number => {
  try {
    if (typeof window === 'undefined') return 0;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Blob([stored]).size : 0;
  } catch (error) {
    console.warn('Failed to get storage size:', error);
    return 0;
  }
};