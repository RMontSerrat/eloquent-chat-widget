import React, { useEffect } from 'react';
import { ChatWidget } from './ChatWidget';
import { useChatStore } from '../store/chatStore';
import { ChatWidgetConfig, ChatMessage } from '../types';
import '../styles/index.css';

export interface ChatWidgetProviderProps {
  config?: Partial<ChatWidgetConfig>;
  children?: React.ReactNode;
  onMessage?: (message: ChatMessage) => void;
}

/**
 * Apply dynamic colors and mode to CSS custom properties
 */
const applyDynamicMode = (config: Partial<ChatWidgetConfig>) => {
  const root = document.documentElement;
  const widgetContainer = document.getElementById('eloquent-chat-widget');
  
  // Apply primary and secondary colors
  if (config.primaryColor) {
    root.style.setProperty('--chat-primary-color', config.primaryColor);
    
    // Calculate hover color dynamically (darken by ~15%)
    const hoverColor = `color-mix(in srgb, ${config.primaryColor} 85%, black)`;
    root.style.setProperty('--chat-primary-hover', hoverColor);
  }
  
  if (config.secondaryColor) {
    root.style.setProperty('--chat-secondary-color', config.secondaryColor);
  }

  // Apply mode (light/dark mode)
  if (widgetContainer && config.mode) {
    // Remove existing mode classes
    widgetContainer.removeAttribute('data-mode');
    widgetContainer.classList.remove('dark', 'light');
    
    // Apply new mode
    if (config.mode === 'dark') {
      widgetContainer.setAttribute('data-mode', 'dark');
      widgetContainer.classList.add('dark');
    } else {
      widgetContainer.setAttribute('data-mode', 'light');
      widgetContainer.classList.add('light');
    }
  }
};

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  config = {},
  children,
  onMessage,
}) => {
  const updateConfig = useChatStore((state) => state.updateConfig);
  const setOnMessageCallback = useChatStore((state) => state.setOnMessageCallback);
  const currentConfig = useChatStore((state) => state.config);

  useEffect(() => {
    if (Object.keys(config).length > 0) {
      updateConfig(config);
    }
  }, [config, updateConfig]);

  // Set the onMessage callback in the store
  useEffect(() => {
    setOnMessageCallback(onMessage);
  }, [onMessage, setOnMessageCallback]);

  // Apply dynamic mode when config changes
  useEffect(() => {
    applyDynamicMode(currentConfig);
    console.log('config', config);
  }, [currentConfig.primaryColor, currentConfig.secondaryColor, currentConfig.mode]);

  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
};