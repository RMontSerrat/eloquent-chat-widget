import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { ChatHeader } from './ChatHeader';
import { MessagesArea } from './MessagesArea';
import { InputArea } from './InputArea';
import { useChat } from '../hooks/useChat';

interface ChatWindowProps {
  getWindowPositionStyles: () => React.CSSProperties;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  getWindowPositionStyles
}) => {
  const { isOpen } = useChat();

  // Animation variants for widget
  const widgetVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={widgetVariants}
          className="elq:absolute elq:z-[9998]"
          style={{ ...getWindowPositionStyles() }}
        >
          <Card className="elq:w-[90vw] elq:md:w-90 elq:h-[85vh] elq:md:h-120 shadow-chat-xl elq:flex elq:flex-col elq:rounded-2xl elq:border border-chat elq:overflow-hidden bg-chat-primary">
            <ChatHeader />
            <MessagesArea />
            <InputArea />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};