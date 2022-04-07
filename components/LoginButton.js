import WalletConnectProvider from '@walletconnect/web3-provider';
import React, { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { providers } from 'ethers';
import Torus from '@toruslabs/torus-embed';
import { toast } from 'react-toastify';
import { Magic } from 'magic-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { setProvider, setWeb3Provider } from '../store/appSlice';
import Modal from './Modal';
import MagicModal from './MagicModal';

const INFURA_ID = 'cd1e3fecfd4941b6b1d00f04f8233e11';

function LoginButton() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    isOpen: false
  });
  const {provider, web3Provider} = useSelector(state => state.app);
  const [loading, setLoading] = useState(false);
  
  const providerOptions = {
    walletconnect     : {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID, // required
      },
    },
    torus             : {
      package: Torus
    }
  };
  
  
  let web3Modal;
  if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
      network      : 'mainnet', // optional
      cacheProvider: true,
      providerOptions, // required
    });
  }
  
  const connect = useCallback(async function() {
    if (typeof window !== 'undefined') {
      setLoading(true);
      try {
        const provider = await web3Modal.connect();
        
        const web3Provider = new providers.Web3Provider(provider);
        
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        
        toast.success(`Wallet connected with address ${address}`);
        
        dispatch(setProvider(provider));
        dispatch(setWeb3Provider(web3Provider));
      } catch (e) {
        toast.error(e);
      }
      setLoading(false);
    }
  }, []);
  
  const disconnect = useCallback(async function() {
    await web3Modal.clearCachedProvider();
    dispatch(setProvider(null));
    dispatch(setWeb3Provider(null));
    
  }, []);
  
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, []);
  
  return (
    <>
      <Modal
        onRequestClose={() => setModal({ isOpen: false})}
        isOpen={modal.isOpen}
      ><MagicModal setModal={setModal} /></Modal>
      {web3Provider ? (
        <button disabled={loading}
                className={'p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded ' +
                'hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1'
                } type="button" onClick={disconnect}>
          {
            loading
              ? <div className="flex items-center justify-center ">
                <div className="w-5 h-5 mx-1 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"/>
                <p>Disconnect</p>
              </div>
              : <p>Disconnect</p>
          }
        </button>
      ) : (
        <div >
          <div className="dropdown inline-block relative">
            <button disabled={loading} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              {
                loading ?<>
                  <div className="w-5 h-5 mx-1 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"/>
                  <span className="mr-1">Connecting</span>
                </> : <span className="mr-1">Connect</span>
              }
              <svg className="fill-current h-4 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-2 ">
              <li onClick={() => connect()} className="cursor-pointer">
                <div className="rounded-t bg-gray-200 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap"> Wallet list</div>
              </li>
              <li onClick={() => setModal({...modal, isOpen: true})} className="cursor-pointer">
                <div className="bg-gray-200 hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap" >Magic link</div>
              </li>
            </ul>
          </div>
  
        </div>
      )}
    </>
  );
}

export default LoginButton;
