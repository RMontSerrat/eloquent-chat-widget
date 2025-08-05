import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from './ui/badge';
import { useChat } from '../hooks/useChat';

export const StatusBadge: React.FC = () => {
  const { isOnline } = useChat();

  return (
    <Badge 
      variant={isOnline ? 'online' : 'offline'} 
      className="elq:text-xs elq:px-3 elq:py-1 elq:rounded-full elq:shadow-sm"
    >
      {isOnline ? (
        <>
          <Wifi size={10} className="elq:mr-1.5" />
          Online
        </>
      ) : (
        <>
          <WifiOff size={10} className="elq:mr-1.5" />
          Offline
        </>
      )}
    </Badge>
  );
};