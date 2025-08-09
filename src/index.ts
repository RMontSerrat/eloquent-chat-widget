import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ChatWidgetProvider } from './components/ChatWidgetProvider';
import { ChatWidget } from './components/ChatWidget';
import { EmbedOptions, ChatWidgetConfig, ChatMessage } from './types';
import { useChatStore } from './store/chatStore';
import './styles/index.css';

// Export components for direct usage
export { ChatWidget, ChatWidgetProvider };
export { useChatStore } from './store/chatStore';
export { useChat, useChatConfig, useChatPersistence } from './hooks/useChat';
export * from './types';

/**
 * EloquentChat function - Similar to Intercom integration
 * Call this function directly in your React components to configure the chat
 */
export const EloquentChat = (config: {
  primaryColor?: string;
  secondaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  welcomeMessage?: string;
  apiKey?: string;
  mode?: 'light' | 'dark';
  placeholder?: string;
  offlineMessage?: string;
  maintenanceMessage?: string;
  onMessage?: (message: ChatMessage) => void;
  [key: string]: any;
}) => {
  // Get store functions
  console.log('config 3', config);
  const { updateConfig } = useChatStore.getState();
  
  // Remove undefined values from config
  const cleanConfig = Object.fromEntries(
    Object.entries(config).filter(([_, value]) => value !== undefined)
  );
  
  // Update configuration
  if (Object.keys(cleanConfig).length > 0) {
    updateConfig(cleanConfig);
  }
  
  // Initialize widget if not already done (for browser environments)
  if (typeof window !== 'undefined' && !widgetContainer) {
    const { onMessage, ...configWithoutCallback } = cleanConfig;
    initChatWidget({ 
      config: configWithoutCallback,
      onMessage: onMessage as ((message: ChatMessage) => void) | undefined
    });
  }
};

// Export UI components
export * from './components/ui';
export { cn } from './lib/utils';

// Global instance management
let widgetRoot: Root | null = null;
let widgetContainer: HTMLElement | null = null;

/**
 * Initialize the chat widget on a page
 */
const initChatWidget = (options: EmbedOptions = {}) => {
  const {
    containerId = 'eloquent-chat-widget',
    config = {},
    onReady,
    onError,
    onMessage,
  } = options;

  try {
    // Clean up existing widget
    if (widgetRoot) {
      destroyChatWidget();
    }

    // Create or find container
    widgetContainer = document.getElementById(containerId);
    if (!widgetContainer) {
      widgetContainer = document.createElement('div');
      widgetContainer.id = containerId;
      document.body.appendChild(widgetContainer);
    }

    // Create React root and render widget
    widgetRoot = createRoot(widgetContainer);
    widgetRoot.render(
      React.createElement(ChatWidgetProvider, {
        config,
        onMessage,
      })
    );

    // Call ready callback
    if (onReady) {
      setTimeout(onReady, 0);
    }

    return {
      destroy: destroyChatWidget,
      updateConfig: (newConfig: Partial<typeof config>) => {
        // Update config through store
        const { updateConfig } = useChatStore.getState();
        updateConfig(newConfig);
      },
    };
  } catch (error) {
    console.error('Failed to initialize chat widget:', error);
    if (onError) {
      onError(error instanceof Error ? error.message : 'Unknown error');
    }
    throw error;
  }
};

/**
 * Destroy the chat widget
 */
const destroyChatWidget = () => {
  if (widgetRoot) {
    widgetRoot.unmount();
    widgetRoot = null;
  }

  if (widgetContainer && widgetContainer.parentNode) {
    widgetContainer.parentNode.removeChild(widgetContainer);
    widgetContainer = null;
  }
};

// Widget instance for convenience
const EloquentChatWidget = {
  init: initChatWidget,
  destroy: destroyChatWidget,
  updateMode: (mode: 'light' | 'dark') => {
    const { updateConfig } = useChatStore.getState();
    updateConfig({ mode });
  },
  updateConfig: (config: Partial<ChatWidgetConfig>) => {
    const { updateConfig } = useChatStore.getState();
    updateConfig(config);
  },
  ChatWidget,
  ChatWidgetProvider,
};

/**
 * Simple script tag initialization
 * This allows the widget to be embedded with just a script tag
 */
const autoInit = () => {
  const scripts = document.querySelectorAll('script[data-eloquent-chat]');
  scripts.forEach((script) => {
    const element = script as HTMLScriptElement;
    const config = {
      primaryColor: element.dataset.primaryColor,
      secondaryColor: element.dataset.secondaryColor,
      position: element.dataset.position as any,
      apiKey: element.dataset.apiKey,
      mode: element.dataset.mode as 'light' | 'dark',
    };

    // Remove undefined values
    Object.keys(config).forEach(key => {
      if ((config as any)[key] === undefined) {
        delete (config as any)[key];
      }
    });

    console.log('config1', config);

    initChatWidget({
      containerId: element.dataset.containerId,
      config,
    });
  });
};

// Browser environment setup
if (typeof window !== 'undefined') {
  // Make functions available globally
  (window as any).EloquentChatWidget = EloquentChatWidget;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
}

// Default export for UMD builds
export default EloquentChatWidget;

// Named exports for ES modules
export { EloquentChatWidget, initChatWidget, destroyChatWidget };