import React, { useEffect } from 'react';
import { useTonConnect } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import { MainButton } from './components/common/MainButton';
import { VaultDashboard } from './components/features/VaultDashboard';

const App: React.FC = () => {
  const { connected } = useTonConnect();

  useEffect(() => {
    // Set Telegram WebApp theme
    WebApp.setHeaderColor('#1d1d1d');
    WebApp.setBackgroundColor('#1d1d1d');
  }, []);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
        <MainButton text="Connect Wallet" onClick={() => {}} />
      </div>
    );
  }

  return <VaultDashboard />;
};

export default App;
