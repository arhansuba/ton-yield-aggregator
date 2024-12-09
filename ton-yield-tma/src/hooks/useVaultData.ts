import { useState, useEffect } from 'react';
import { Address, Contract, ContractProvider, getProvider } from '@ton/core';
import { getVaultContract } from '../services/contracts';

interface VaultData {
  totalAssets: string;
  userShares: string;
  loading: boolean;
}

// Contract interface
class VaultContract implements Contract {
  constructor(readonly address: Address) {}

  async getData(provider: ContractProvider, address: Address) {
    const { stack } = await provider.get('get_vault_data', [
      { type: 'slice', cell: address.toCell() }
    ]);
    
    return {
      totalAssets: stack.readBigNumber(),
      userShares: stack.readBigNumber()
    };
  }
}

export function useVaultData(userAddress?: string) {
  const [data, setData] = useState<VaultData>({
    totalAssets: '0',
    userShares: '0',
    loading: true
  });

  useEffect(() => {
    async function fetchData() {
      if (!userAddress) return;

      try {
        const provider = getProvider(); // Define the provider
        const vault = getVaultContract() as VaultContract;
        const { totalAssets, userShares } = await vault.getData(
          provider,
          Address.parse(userAddress)
        );

        setData({
          totalAssets: totalAssets.toString(),
          userShares: userShares.toString(),
          loading: false
        });
      } catch (error) {
        console.error('Error fetching vault data:', error);
        setData(prev => ({ ...prev, loading: false }));
      }
    }

    fetchData();
  }, [userAddress]);

  return data;
}