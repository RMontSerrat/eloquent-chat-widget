import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { useChat } from '../hooks/useChat';

export const UnreadBadge: React.FC = () => {
  const { unreadCount } = useChat();

  if (unreadCount <= 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.3
      }}
      className="elq:absolute elq:-top-2 elq:-right-2"
    >
      <Badge className="elq:h-5 elq:w-5 elq:p-0 elq:flex elq:items-center elq:justify-center elq:bg-red-500 elq:text-white elq:text-xs">
        {unreadCount > 9 ? '9+' : unreadCount}
      </Badge>
    </motion.div>
  );
};