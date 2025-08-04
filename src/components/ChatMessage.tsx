import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

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
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className={`chat-message-bubble ${isUser ? 'user' : 'assistant'}`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        {showTimestamp && (
          <span className="block text-xs opacity-60 mt-1">
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