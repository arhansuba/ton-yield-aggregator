import { Address } from '@ton/core';
import { Vault } from '../wrappers/Vault';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    if (args.length < 1) {
        ui.write('Usage: blueprint run verify <vault-address>');
        return;
    }

    const address = Address.parse(args[0]);
    const vault = provider.open(Vault.createFromAddress(address));

    const data = await vault.getVaultData();
    ui.write('Vault data:');
    ui.write(`Total Assets: ${data.totalAssets}`);
    ui.write(`Total Shares: ${data.totalShares}`);
    ui.write(`Owner: ${data.owner}`);
    ui.write(`Paused: ${data.paused}`);
    ui.write(`Strategy Count: ${data.strategyCount}`);
}
