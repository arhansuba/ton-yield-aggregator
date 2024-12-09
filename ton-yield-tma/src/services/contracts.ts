import { TonClient, Address } from '@ton/ton';
import { VAULT_ADDRESS } from '../utils/constants';

const client = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC'
});

export function getVaultContract() {
  return client.open(Address.parse(VAULT_ADDRESS));
}
