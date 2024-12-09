import { Blueprint } from "@ton/blueprint";

export const blueprint: Blueprint = {
  contracts: {
    vault: {
      path: 'contracts/vault/Vault.fc',
      output: 'build/vault',
    },
    baseStrategy: {
      path: 'contracts/strategy/BaseStrategy.fc',
      output: 'build/baseStrategy',
    },
    dedustStrategy: {
      path: 'contracts/strategy/DeDustStrategy.fc',
      output: 'build/dedustStrategy',
    },
    stonStrategy: {
      path: 'contracts/strategy/StonStrategy.fc',
      output: 'build/stonStrategy',
    }
  },
};
