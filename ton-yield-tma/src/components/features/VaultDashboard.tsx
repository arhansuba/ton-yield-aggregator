import React from 'react';
import { useTonConnect } from '@tonconnect/ui-react';
import { useVaultData } from '../../hooks/useVaultData';
import { MainButton } from '../common/MainButton';

export const VaultDashboard: React.FC = () => {
  const { connected, wallet } = useTonConnect();
  const { totalAssets, userShares, loading } = useVaultData(wallet?.account.address);

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Vault Dashboard</h1>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Assets</h2>
          <p className="text-2xl">{totalAssets} TON</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Your Shares</h2>
          <p className="text-2xl">{userShares} Shares</p>
        </div>
      </div>
      <MainButton 
        text="Deposit TON" 
        onClick={() => {}} 
        loading={loading}
      />
    </div>
  );
};
