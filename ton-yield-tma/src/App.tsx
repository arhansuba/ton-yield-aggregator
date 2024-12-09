import { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react'; 
import { WebApp } from '@twa-dev/sdk';
import { VaultDashboard } from '../features/VaultDashboard';
import { MainButton } from './MainButton';
import React from 'react';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  WebApp.ready();

  const handleConnect = () => {
    setIsConnected(true);
    WebApp.MainButton.hide();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">TON Yield</h1>
        <TonConnectButton onConnected={handleConnect} />
      </header>

      <main className="container mx-auto px-4 py-6">
        {isConnected ? (
          <VaultDashboard />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl mb-4">Connect Wallet to Continue</h2>
            <p className="text-gray-600">Manage your TON yield strategies</p>
          </div>
        )}
      </main>

      <MainButton
        text="Connect Wallet"
        onClick={() => WebApp.HapticFeedback.impactOccurred('medium')}
        show={!isConnected}
      />
    </div>
  );
}