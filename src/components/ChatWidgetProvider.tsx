import React, { useEffect } from 'react';
import { ChatWidget } from './ChatWidget';
import { useChatStore } from '../store/chatStore';
import { ChatWidgetConfig } from '../types';
import '../styles/index.css';

export interface ChatWidgetProviderProps {
  config?: Partial<ChatWidgetConfig>;
  children?: React.ReactNode;
}

/**
 * Apply dynamic colors to CSS custom properties
 */
const applyDynamicTheme = (config: Partial<ChatWidgetConfig>) => {
  const root = document.documentElement;
  
  if (config.primaryColor) {
    root.style.setProperty('--chat-primary-color', config.primaryColor);
    
    // Calculate hover color dynamically (darken by ~15%)
    const hoverColor = `color-mix(in srgb, ${config.primaryColor} 85%, black)`;
    root.style.setProperty('--chat-primary-hover', hoverColor);
  }
  
  if (config.secondaryColor) {
    root.style.setProperty('--chat-secondary-color', config.secondaryColor);
  }
};

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  config = {},
  children,
}) => {
  const updateConfig = useChatStore((state) => state.updateConfig);
  const currentConfig = useChatStore((state) => state.config);

  useEffect(() => {
    if (Object.keys(config).length > 0) {
      updateConfig(config);
    }
  }, [config, updateConfig]);

  // Apply dynamic theme when config changes
  useEffect(() => {
    applyDynamicTheme(currentConfig);
  }, [currentConfig.primaryColor, currentConfig.secondaryColor]);

  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
};