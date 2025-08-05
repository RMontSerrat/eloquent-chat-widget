import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface MaintenanceBannerProps {
  message?: string;
}

export const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({
  message = 'Our chat service is temporarily under maintenance. Please try again later.'
}) => {
  return (
    <div className="elq:rounded-lg elq:border elq:border-amber-200 elq:bg-gradient-to-r elq:from-amber-50 elq:to-orange-50 elq:shadow-sm elq:backdrop-blur-sm elq:mt-2">
      <div className="elq:flex elq:items-start elq:gap-3 elq:p-2">
        <div className="elq:flex-shrink-0 elq:mt-0.5">
          <AlertTriangle className="elq:w-4 elq:h-4 elq:text-amber-600" />
        </div>
        <div className="elq:flex-1 elq:min-w-0">
          <h4 className="elq:text-sm elq:font-medium elq:text-amber-800 elq:mb-1">
            Maintenance Mode
          </h4>
          <p className="elq:text-xs elq:text-amber-700">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};