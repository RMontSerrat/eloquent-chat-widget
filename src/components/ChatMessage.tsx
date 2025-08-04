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
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg font-secondary bg-gray-100 text-gray-900 rounded-bl-sm",
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap mb-0">
          {message.content}
        </p>
        {showTimestamp && (
          <span className={cn(
            "block text-xs mt-1 text-gray-500",
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