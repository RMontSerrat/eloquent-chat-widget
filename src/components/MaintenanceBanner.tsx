import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface MaintenanceBannerProps {
  isVisible: boolean;
  message?: string;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  isVisible,
  message = 'Our chat service is temporarily under maintenance. Please try again later.'
}) => {
  if (!isVisible) return null;
  
  return (
    <div className="maintenance-banner">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <p className="maintenance-banner-text">
          {message}
        </p>
      </div>
    </div>
  );
};