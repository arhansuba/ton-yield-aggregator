import { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address, toNano, fromNano } from '@ton/core';
import { useVaultData } from '../../hooks/useVaultData';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import React from 'react';

export default function TransactionHandler() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tonConnectUI] = useTonConnectUI();
  const connected = tonConnectUI.connected;
  const wallet = tonConnectUI.wallet;
  const { deposit, withdraw, vaultData } = useVaultData();

  const handleDeposit = async () => {
    try {
      setLoading(true);
      setError('');
      await deposit(toNano(amount));
    } catch (err) {
      setError('Deposit failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setError('');
      await withdraw(toNano(amount));
    } catch (err) {
      setError('Withdrawal failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <Card className="p-4">
        <p className="text-center">Please connect your wallet to continue</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Available Balance</h3>
            <p className="text-2xl font-bold">
              {fromNano(vaultData?.totalAssets || 0)} TON
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in TON"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDeposit}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              disabled={loading}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Withdraw
            </button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </Card>
    </div>
  );
}