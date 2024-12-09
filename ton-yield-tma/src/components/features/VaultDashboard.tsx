import { useState } from 'react';
import { formatBalance, formatPercent } from '../utils/formatters';
import { useVaultData } from '../../hooks/useVaultData';
import { Card } from './common/Card';
import { Button } from './common/Button';
import React from 'react';

export default function VaultDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { 
    balance,
    apy,
    totalValueLocked,
    userDeposit,
    fetchVaultData
  } = useVaultData();

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchVaultData();
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Your Position</h3>
            <p className="text-3xl font-bold">
              {formatBalance(userDeposit)} TON
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Current APY</h3>
            <p className="text-3xl font-bold text-green-600">
              {formatPercent(apy)}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Vault Details</h3>
            <Button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-sm"
            >
              Refresh
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Value Locked</p>
              <p className="text-xl font-medium">
                {formatBalance(totalValueLocked)} TON
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-xl font-medium">
                {formatBalance(balance)} TON
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}