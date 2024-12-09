import { useState, useEffect } from 'react';
import { Address } from '@ton/core';
import { getVaultContract } from '../services/contracts';

export function useVaultData(userAddress?: string) {
  const [data, setData] = useState({
    totalAssets: '0',
    userShares: '0',
    loading: true
  });

  useEffect(() => {
    async function fetchData() {
      if (!userAddress) return;
      
      try {
        const vault = getVaultContract();
        const { totalAssets, userShares } = await vault.getData(Address.parse(userAddress));
        
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
