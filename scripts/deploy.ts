import { Address, toNano } from '@ton/core';
import { Vault } from '../wrappers/Vault';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const vault = provider.open(Vault.createFromConfig({
        owner: provider.sender().address!,
        totalAssets: toNano('0'),
        totalShares: toNano('0'),
        strategies: null,
        paused: false,
        id: function (id: any, arg1: number): unknown {
            throw new Error('Function not implemented.');
        },
        counter: function (counter: any, arg1: number): unknown {
            throw new Error('Function not implemented.');
        }
    }, await compile('Vault')));

    await vault.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(vault.address);

    console.log('Vault deployed at:', vault.address);
}