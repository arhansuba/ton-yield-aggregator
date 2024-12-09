import { TonClient, Address } from '@ton/ton';
import { VAULT_ADDRESS } from '../utils/constants';

const client = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC'
});

export function getVaultContract() {
  const vaultAddress = Address.parse(VAULT_ADDRESS);
  const vaultContract: Contract = { address: vaultAddress };
  return client.open(vaultContract);
}
