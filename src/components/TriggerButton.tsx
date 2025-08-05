import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { UnreadBadge } from './UnreadBadge';
import { useChat } from '../hooks/useChat';

export const TriggerButton: React.FC = () => {
  const { isOpen, config, toggleWidget } = useChat();

  // Animation variants for button
  const buttonVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div
      className="elq:relative elq:z-[9999]"
      variants={buttonVariants}
      animate={isOpen ? "open" : "idle"}
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        onClick={toggleWidget}
        variant="primary"
        size="icon"
        className="chat-widget-trigger elq:h-14 elq:w-14 elq:rounded-full elq:shadow-lg elq:hover:shadow-xl"
        style={{
          backgroundColor: config.primaryColor || '#007bff'
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="elq:relative">
            <MessageCircle size={24} />
            <UnreadBadge />
          </div>
        )}
      </Button>
    </motion.div>
  );
};