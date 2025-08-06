import React from 'react';
import { CardHeader } from './ui/card';
import { StatusBadge } from './StatusBadge';
import { MaintenanceBanner } from './MaintenanceBanner';
import { useChat } from '../hooks/useChat';
import elqLogo from '@/static/images/eloquentai.png';

export const ChatHeader: React.FC = () => {
  const { config, isMaintenanceMode } = useChat();

  return (
    <CardHeader className="bg-chat-primary elq:border-b border-chat elq:p-4 elq:rounded-t-2xl">
      {/* Maintenance Banner */}
      <div className="elq:flex elq:items-center elq:justify-between">
        <div className="elq:flex elq:items-center elq:gap-3">
          <img 
            src={elqLogo} 
            alt="Eloquent AI"
            className="elq:w-8 elq:h-8 elq:rounded-full"
            onError={(e) => {
              // Fallback to a simple icon if logo fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          <h3 className="elq:font-medium text-chat-primary elq:text-sm">
            Eloquent AI
          </h3>
        </div>
        <StatusBadge />
      </div>
      {isMaintenanceMode && (
        <MaintenanceBanner 
          message={config.maintenanceMessage}
        />
      )}
    </CardHeader>
  );
};