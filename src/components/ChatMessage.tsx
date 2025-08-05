import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
  showTimestamp?: boolean;
  formatTimestamp?: (timestamp: Date) => string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  showTimestamp = true,
  formatTimestamp,
}) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn(
      "elq:flex elq:w-full elq:mb-4 elq:gap-2 elq:items-end",
      isUser ? "elq:justify-end" : "elq:justify-start"
    )}>
      {/* Avatar for assistant messages */}
      {!isUser && (
        <img 
          src="https://logo.clearbit.com/eloquentai.co" 
          alt="Eloquent AI"
          className="elq:w-6 elq:h-6 elq:rounded-full elq:flex-shrink-0 elq:mt-1"
          onError={(e) => {
            // Fallback to a simple icon if logo fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      
      <div className={cn(
        "elq:max-w-xs lg:elq:max-w-md elq:px-4 elq:py-3 elq:rounded-2xl elq:font-secondary",
        isUser 
          ? "chat-message-bubble user bg-primary elq:text-white elq:rounded-br-sm" 
          : "chat-message-bubble assistant bg-chat-secondary text-chat-primary elq:rounded-bl-sm"
      )}>
        <p className="elq:text-sm elq:leading-relaxed elq:whitespace-pre-wrap elq:mb-0">
          {message.content}
        </p>
        {showTimestamp && (
          <span className={cn(
            "elq:block elq:text-xs elq:mt-1",
            isUser ? "elq:text-white/70" : "text-chat-muted"
          )}>
            {formatTimestamp ? formatTimestamp(message.timestamp) : 
             message.timestamp.toLocaleTimeString([], { 
               hour: '2-digit', 
               minute: '2-digit' 
             })
            }
          </span>
        )}
      </div>
    </div>
  );
};