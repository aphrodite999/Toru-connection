// magic.js
import { Magic } from 'magic-sdk';
import Web3 from 'web3';

/**
 * NOTE: when connecting to a testnet, Test API keys from the Magic dashboard must be used (Live API keys for eth mainnet)
 */

const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.matic.today',
  chainId: 80001,
};

// Setting network to Matic
export const magicMatic = new Magic('pk_live_706CBCFD8CA20693', { network: customNodeOptions });
magicMatic.network = 'matic';

export const maticWeb3 = new Web3(magicMatic.rpcProvider);

// Setting network to Ethereum (Ropsten Testnet)
export const magicEthereum = new Magic('pk_live_706CBCFD8CA20693', { network: 'ropsten' });
magicEthereum.network = 'ethereum';

export const ethWeb3 = new Web3(magicEthereum.rpcProvider);