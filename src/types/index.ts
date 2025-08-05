export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'assistant';
  isTyping?: boolean;
}

export interface ChatUser {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface ChatWidget {
  id: string;
  isOpen: boolean;
  isOnline: boolean;
  isMaintenanceMode: boolean;
  messages: ChatMessage[];
  user: ChatUser | null;
  isTyping: boolean;
  lastSeen?: Date;
}

export interface ChatWidgetConfig {
  apiKey?: string;
  primaryColor?: string;
  secondaryColor?: string;
  placeholder?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  mode?: 'light' | 'dark';
  enablePersistence?: boolean;
  maxMessages?: number;
  typingIndicatorDelay?: number;
  offlineMessage?: string;
  maintenanceMessage?: string;
  welcomeMessage?: string;
  customStyles?: Record<string, string>;
  openaiApiKey?: string;
  openaiModel?: string;
}

export interface LLMResponse {
  content: string;
  error?: string;
  timestamp: Date;
}

export interface ChatState extends ChatWidget {
  config: ChatWidgetConfig;
  isLoading: boolean;
  error: string | null;
  onMessageCallback?: (message: ChatMessage) => void;
}

export interface ChatActions {
  // Widget control
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
  
  // Messages
  sendMessage: (content: string) => Promise<void>;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  
  // Status
  setOnlineStatus: (isOnline: boolean) => void;
  setMaintenanceMode: (isMaintenanceMode: boolean) => void;
  setTyping: (isTyping: boolean) => void;
  
  // User
  setUser: (user: ChatUser | null) => void;
  updateUser: (updates: Partial<ChatUser>) => void;
  
  // Configuration
  updateConfig: (config: Partial<ChatWidgetConfig>) => void;
  
  // Persistence
  loadFromStorage: () => void;
  saveToStorage: () => void;
  clearStorage: () => void;
  
  // Error handling
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Callbacks
  setOnMessageCallback: (callback?: (message: ChatMessage) => void) => void;
}

export type ChatStore = ChatState & ChatActions;

export interface EmbedOptions {
  containerId?: string;
  config?: ChatWidgetConfig;
  onReady?: () => void;
  onMessage?: (message: ChatMessage) => void;
  onError?: (error: string) => void;
  onToggle?: (isOpen: boolean) => void;
}