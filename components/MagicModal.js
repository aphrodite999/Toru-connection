import React, { useState } from 'react';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { useDispatch } from 'react-redux';
import { setProvider, setWeb3Provider } from '../store/appSlice';
const magic = new Magic('pk_live_706CBCFD8CA20693',{
  extensions: [new OAuthExtension()],
});

const MagicModal = ({setModal}) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  async function connect(type) {
    const validEmail = /\S+@\S+\.\S+/
    if(type === 'email' && email.length && validEmail.test(email)) {
      await magic.auth.loginWithMagicLink({email, redirectURI: `http://localhost:3000`});
      magic.network = 'matic';
      dispatch(setProvider(magic.auth.sdk.rpcProvider));
      dispatch(setWeb3Provider(magic.auth.sdk.rpcProvider));
      setModal({isOpen:false})
    }
    if(type === 'google') {
      await magic.oauth.loginWithRedirect({
        provider: 'google' /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: `http://localhost:3000`,
        scope: ['user:email'] /* optional */,
      });
      dispatch(setProvider(magic.auth.sdk.rpcProvider));
      dispatch(setWeb3Provider(magic.auth.sdk.rpcProvider));
      setModal({isOpen:false})
    }
  }
  
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            E-mail
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             type="email" placeholder="E-mail"/>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => connect('email')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none' +
            ' focus:shadow-outline"
                  type="submit">
            Connect with email
          </button>
        </div>
        
        <div className="flex mt-10 items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
            google
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagicModal;