import WalletConnectProvider from '@walletconnect/web3-provider';
import React from 'react';
import Web3Modal from 'web3modal';
import { providers } from 'ethers';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProvider, setWeb3Modal } from '../../store/appSlice';


const INFURA_ID = 'cd1e3fecfd4941b6b1d00f04f8233e11';

function currentPage( path ) {
  if (path === router.asPath) return 'p-2 lg:px-4 md:mx-2 text-center text-white rounded bg-indigo-600 hover:bg-indigo-700';
  if (path !== router.asPath) return 'p-2 lg:px-4 md:mx-2 text-center text-gray-600 rounded hover:bg-gray-200' +
    ' hover:text-gray-700' +
    ' transition-colors duration-300';
}

function WalletConnect() {
  const dispatch = useDispatch();

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID, // required
      },
    },

  };

  let web3Modal;
  if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
      network      : 'mainnet', // optional
      cacheProvider: false,
      providerOptions, // required
    });
  }

  const connect = () => {
      try {
        new Promise(async (res,rej) => {
          const provider = await web3Modal.connect()

          const web3Provider = new providers.Web3Provider(provider)
          const signer = web3Provider.getSigner()
          const address = await signer.getAddress()
          // address = "0x9dc28C2eD9815fdE7A534df172Bf314045577CFC";
          res({provider, address})
        }).then(result => {
          toast.success(`Wallet connected with address ${result.address}`);
          // currentpage("/creator-dashboard");
          dispatch(setProvider({
            provider:result.provider,
            address: result.address
          }));

          dispatch(setWeb3Modal(web3Modal))
        })
      } catch (e) {
        toast.error(e);
      }
  }


  return (
      <button
        className={'flex items-center justify-center border border-solid hover:bg-gray-200 py-2 px-4 ' +
        'focus:outline-none rounded focus:shadow-outline'}
        onClick={connect}
        >
        <img src="./walletconnect.png"
             className={'w-10 pr-3'}
             alt=" "/>
        WalletConnect</button>
  );
}

export default WalletConnect;