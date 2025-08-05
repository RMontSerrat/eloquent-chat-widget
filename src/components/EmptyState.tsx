import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useChat } from '../hooks/useChat';

export const EmptyState: React.FC = () => {
  const { config } = useChat();

  return (
    <div className="elq:flex elq:flex-col elq:items-center elq:justify-center elq:h-full elq:text-center elq:py-12">
      <div className="elq:bg-gradient-to-br elq:from-primary/10 elq:to-primary/5 elq:p-6 elq:rounded-2xl elq:mb-4">
        <MessageCircle size={48} className="elq:text-primary/60" />
      </div>
      <p className="elq:text-gray-600 elq:text-sm elq:max-w-48 elq:leading-relaxed">
        {config.welcomeMessage || 'Start a conversation!'}
      </p>
    </div>
  );
};