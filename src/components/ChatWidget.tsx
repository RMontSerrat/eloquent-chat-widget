import React, { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatWindow } from './ChatWindow';
import { TriggerButton } from './TriggerButton';

export const ChatWidget: React.FC = () => {
  const { isOpen, config, scrollToBottom } = useChat();

  // Scroll to bottom when widget opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 300); // Espera a animação terminar
      return () => clearTimeout(timer);
    }
  }, [isOpen, scrollToBottom]);

  const getPositionStyles = () => {
    switch (config.position) {
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const getWindowPositionStyles = () => {
    switch (config.position) {
      case 'bottom-left':
        return { bottom: '64px', left: '0' };
      case 'top-right':
        return { top: '64px', right: '0' };
      case 'top-left':
        return { top: '64px', left: '0' };
      default:
        return { bottom: '64px', right: '0' };
    }
  };

  return (
    <div className="elq:fixed elq:z-[9999] elq:font-secondary" style={{ ...getPositionStyles() }}>
      <ChatWindow
        getWindowPositionStyles={getWindowPositionStyles}
      />

      <TriggerButton />
    </div>
  );
};