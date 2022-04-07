// import { DashboardStyle } from './_app';

import React, { useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProvider } from '../src/store/appSlice';


let magic;
if (typeof window !== 'undefined') {
  magic = new Magic('pk_live_706CBCFD8CA20693', {
    extensions: [new OAuthExtension()],
  });
}

export default function index() {
  const dispatch = useDispatch()
  const router = useRouter();
  
  const foo = async () => {
    toast.info('Connecting... please wait!')
    const result = await magic.oauth.getRedirectResult();
    dispatch(setProvider({
      provider: magic.auth.sdk.rpcProvider,
      address: result.magic.userMetadata.publicAddress
    }))
    toast.success(`Wallet connect with address ${result.magic.userMetadata.publicAddress}`);
  };
  useEffect(() => {
    const {provider, state} = router.query;
    
    if (typeof window !== 'undefined' && provider === 'google' && state) {
      foo();
    }
  }, [router.query]);
  
  return (
    // <div className = "back_img" style={DashboardStyle} />
    <div />
  );
}
