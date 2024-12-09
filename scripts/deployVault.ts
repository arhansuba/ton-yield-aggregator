import { toNano } from '@ton/core';
import { Vault } from '../wrappers/Vault';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vault = provider.open(
        Vault.createFromConfig(
            {
                owner: provider.sender().address!,
                totalAssets: toNano('0'),
                totalShares: toNano('0'),
                strategies: null,
                paused: false,
                id: (id: any, arg1: number) => Math.floor(Math.random() * 10000),
                counter: (counter: any, arg1: number) => 0,
            },
            await compile('Vault')
        )
    );

    await vault.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(vault.address);

    console.log('ID', await vault.getID());
}
