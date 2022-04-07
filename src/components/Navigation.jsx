import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { toast } from 'react-toastify';
import Torus from '@toruslabs/torus-embed';
import { clearProvider } from '../store/appSlice';

let magic;
if (typeof window !== 'undefined') {
  magic = new Magic('pk_live_706CBCFD8CA20693', {
    extensions: [new OAuthExtension()],
  });
}

const open = <svg className="h-5 w-5 text-indigo-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                  strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z"/>
  <line x1="4" y1="6" x2="13" y2="6"/>
  <line x1="4" y1="12" x2="11" y2="12"/>
  <line x1="4" y1="18" x2="11" y2="18"/>
  <polyline points="15 15 18 18 21 15"/>
  <line x1="18" y1="6" x2="18" y2="18"/>
</svg>

const close = <svg className="h-5 w-5 text-indigo-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                   strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z"/>
  <line x1="4" y1="6" x2="11" y2="6"/>
  <line x1="4" y1="12" x2="11" y2="12"/>
  <line x1="4" y1="18" x2="13" y2="18"/>
  <polyline points="15 9 18 6 21 9"/>
  <line x1="18" y1="6" x2="18" y2="18"/>
</svg>

const Navigation = ({router}) => {
  const [openMobile, setOpenMobile] = useState(false)
  const {provider, web3Modal, address} = useSelector(state => state.app)
  const dispatch = useDispatch()
  
  
  function currentPage( path ) {
    if (path === router.asPath) return 'p-2 lg:px-4 md:mx-2 text-center text-white rounded bg-indigo-600 hover:bg-indigo-700';
    if (path !== router.asPath) return 'p-2 lg:px-4 md:mx-2 text-center text-gray-600 rounded hover:bg-gray-200' +
      ' hover:text-gray-700' +
      ' transition-colors duration-300';
  }
  
  async function disconnect() {
    if(provider.isTorus) {
      const torus = new Torus()
      await torus.init();
      await torus.logout();
    }
    if(provider.isMagic) await magic.user.logout();
    if(web3Modal) web3Modal.clearCachedProvider()
    
    dispatch(clearProvider());
    
    toast.success('Wallet was disconnected')
  }
  
  return (
    <nav className="py-2 md:py-4 header-bar">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <a href="/" className="font-extrabold text-indigo-600 text-2xl hover:text-indigo-700">Lun</a>
          <button
            onClick={() => setOpenMobile(!openMobile)}
            className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-100 hover:opacity-75 md:hidden">
            {openMobile ? close : open}
          </button>
        </div>
      
        <div className={`${openMobile ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0`}>
          <Link href='/'>
            <a href="#" className={currentPage('/')}>Home</a>
          </Link>
          <Link href="/my-assets">
            <a className={currentPage('/my-assets')}>
              My Digital Assets
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className={currentPage('/creator-dashboard')}>
              Creator Dashboard
            </a>
          </Link>
          {
            provider ?
              <button
                      className={'p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded ' +
                      'hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1'
                      } type="button" onClick={disconnect}>
                <p>Disconnect</p>
              </button>
              :
              <Link href="/login">
                <a className={currentPage('/login')}>
                  Sign In
                </a>
              </Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navigation;