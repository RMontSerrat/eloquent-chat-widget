import React from 'react';
import elqLogo from '@/static/images/eloquentai.png';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="elq:flex elq:w-full elq:mb-4 elq:gap-2 elq:justify-start elq:items-end">
      {/* Avatar for typing indicator */}
      <img 
        src={elqLogo} 
        alt="Eloquent AI"
        className="elq:w-6 elq:h-6 elq:rounded-full elq:flex-shrink-0 elq:mt-1"
        onError={(e) => {
          // Fallback to a simple icon if logo fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
      
      <div className="bg-chat-secondary text-chat-primary elq:p-3 elq:rounded-2xl elq:rounded-bl-sm">
        <div className="elq:flex elq:items-center elq:gap-1 elq:py-2">
          <div className="elq:w-2 elq:h-2 text-chat-muted elq:bg-current elq:rounded-full elq:animate-bounce elq:[animation-delay:-0.3s]"></div>
          <div className="elq:w-2 elq:h-2 text-chat-muted elq:bg-current elq:rounded-full elq:animate-bounce elq:[animation-delay:-0.15s]"></div>
          <div className="elq:w-2 elq:h-2 text-chat-muted elq:bg-current elq:rounded-full elq:animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};