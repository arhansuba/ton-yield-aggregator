import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';


export interface VaultConfig {
    id(id: any, arg1: number): unknown;
    counter(counter: any, arg1: number): unknown;

    owner: Address;

    totalAssets: bigint;

    totalShares: bigint;

    strategies: any;

    paused: boolean;

}


export function vaultConfigToCell(config: VaultConfig): Cell {
    return beginCell().storeUint(config.id(0, 0) as number, 32).storeUint(config.counter(0, 0) as number, 32).endCell();
}

export const Opcodes = {
    increase: 0x7e8764ef,
};

export class Vault implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Vault(address);
    }
    async getVaultData(provider: ContractProvider) {
        const { stack } = await provider.get('get_vault_data', []);
        return {
            totalAssets: stack.readBigNumber(),
            totalShares: stack.readBigNumber(),
            owner: stack.readAddress(),
            paused: stack.readBoolean(),
                strategyCount: stack.readNumber()
            };
        }

    static createFromConfig(config: VaultConfig, code: Cell, workchain = 0) {
        const data = vaultConfigToCell(config);
        const init = { code, data };
        return new Vault(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendIncrease(
        provider: ContractProvider,
        via: Sender,
        opts: {
            increaseBy: number;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.increase, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.increaseBy, 32)
                .endCell(),
        });
    }

    async getCounter(provider: ContractProvider) {
        const result = await provider.get('get_counter', []);
        return result.stack.readNumber();
    }

    async getID(provider: ContractProvider) {
        const result = await provider.get('get_id', []);
        return result.stack.readNumber();
    }
}
