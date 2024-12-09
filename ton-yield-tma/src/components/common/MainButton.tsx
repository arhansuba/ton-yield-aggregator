import React from 'react';
import WebApp from '@twa-dev/sdk';

interface MainButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

export const MainButton: React.FC<MainButtonProps> = ({ text, onClick, loading }) => {
  React.useEffect(() => {
    WebApp.MainButton.setParams({
      text: loading ? 'Loading...' : text,
      is_active: !loading,
    }).onClick(onClick);
    
    return () => {
      WebApp.MainButton.offClick(onClick);
    };
  }, [text, onClick, loading]);

  return null;
};
