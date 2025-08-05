import React from 'react';
import { Send } from 'lucide-react';
import { CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useChat } from '../hooks/useChat';

export const InputArea: React.FC = () => {
  const {
    inputValue,
    canSendMessage,
    config,
    setInputValue,
    handleKeyDown,
    handleSendMessage
  } = useChat();

  return (
    <CardFooter className="bg-chat-primary elq:border-t border-chat elq:p-4 elq:rounded-b-2xl">
      <div className="elq:flex elq:gap-3 elq:w-full">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={config.placeholder || 'Type a message...'}
          disabled={!canSendMessage}
          rows={1}
          className="elq:flex-1 elq:min-h-[44px] elq:max-h-[100px] sm:elq:max-h-[120px] elq:resize-none border-chat elq:rounded-xl elq:px-4 elq:py-3 elq:focus:border-primary elq:focus:ring-2 elq:focus:ring-primary/20 bg-chat-secondary text-chat-primary shadow-chat elq:transition-all elq:duration-200 elq:overflow-hidden elq:scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            const maxHeight = window.innerWidth < 640 ? 80 : 120; // Mobile: 80px, Desktop: 120px
            target.style.height = 'auto';
            const newHeight = Math.min(target.scrollHeight, maxHeight);
            target.style.height = `${newHeight}px`;
            target.style.overflowY = target.scrollHeight > maxHeight ? 'hidden' : 'hidden';
          }}
        />
        <Button
          onClick={() => handleSendMessage()}
          disabled={!canSendMessage || !inputValue.trim()}
          variant="primary"
          size="icon"
          className="elq:h-[46px] elq:w-[46px] elq:shrink-0 elq:rounded-xl elq:shadow-lg elq:hover:shadow-xl elq:transition-all elq:duration-200 elq:hover:scale-105"
          aria-label="Send message"
        >
          <Send size={18} />
        </Button>
      </div>
    </CardFooter>
  );
};