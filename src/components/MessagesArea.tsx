import React from 'react';
import { CardContent } from './ui/card';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { EmptyState } from './EmptyState';
import { useChat } from '../hooks/useChat';

export const MessagesArea: React.FC = () => {
  const {
    messages,
    isTyping,
    error,
    messagesEndRef,
    formatTimestamp
  } = useChat();

  return (
    <CardContent className="elq:flex-1 elq:p-4 elq:overflow-y-auto elq:flex elq:flex-col bg-chat-primary">
      {/* Error Message */}
      {error && (
        <div className="elq:bg-gradient-to-r elq:from-red-50 elq:to-red-100/50 elq:border elq:border-red-200 elq:rounded-xl elq:p-4 elq:mb-4 elq:shadow-sm">
          <p className="elq:text-red-800 elq:text-sm elq:font-medium">{error}</p>
        </div>
      )}


      {/* Messages */}
      <div className="elq:flex-1 elq:space-y-3 elq:flex elq:flex-col elq:justify-end">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            formatTimestamp={formatTimestamp}
          />
        ))}
        
        {/* Typing Indicator */}
        <TypingIndicator isVisible={isTyping} />
        
        {/* Empty State */}
        {messages.length === 0 && !isTyping && (
          <EmptyState />
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </CardContent>
  );
};