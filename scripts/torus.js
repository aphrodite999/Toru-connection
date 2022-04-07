import Web3 from 'web3';
import Matic from '@maticnetwork/maticjs';
import Network from '@maticnetwork/meta/network';

const maticClient = {
  _matic: null,
  _network: null,
  connect: async (_network, _version) => {
    const network = new Network(_network, _version);
    console.log(network.Main.RPC, network.Matic.RPC);
    const matic = new Matic({
      network: _network,
      version: _version,
      parentProvider: new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/73d0b3b9a4b2499da81c71a2b2a473a9'),
      maticProvider: new Web3.providers.HttpProvider(network.Matic.RPC)
    });
    await matic.initialize();
    maticClient._matic = matic;
    maticClient._network = network;
    return { matic, network };
  },
  getClient: async (_network, _version) => {
    if (maticClient._matic && maticClient._network) {
      return { matic: maticClient._matic, network: maticClient._network };
    }
    return await maticClient.connect(_network, _version);
  }
};

const getMaticAccountDetails = async (privateKey) => {
  const { matic, network } = await maticClient.getClient('mainnet', 'v1');

  const tokenAddress = network.Matic.Contracts.Tokens.MaticToken;
  matic.setWallet(privateKey);

  const account = matic.web3Client.web3.eth.accounts.privateKeyToAccount(privateKey);
  let address = account.address;

  const balance = await matic.balanceOfERC20(
    address, //User address
    tokenAddress, // Token address
    {
      parent: false
    }
  );
  return ({ balance, address })
};