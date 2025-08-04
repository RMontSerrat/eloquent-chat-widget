import React, { useEffect } from 'react';
import { ChatWidget } from './ChatWidget';
import { useChatStore } from '../store/chatStore';
import { ChatWidgetConfig } from '../types';
import '../styles/index.css';

export interface ChatWidgetProviderProps {
  config?: Partial<ChatWidgetConfig>;
  children?: React.ReactNode;
}

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  config = {},
  children,
}) => {
  const updateConfig = useChatStore((state) => state.updateConfig);

  useEffect(() => {
    if (Object.keys(config).length > 0) {
      updateConfig(config);
    }
  }, [config, updateConfig]);

  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
};