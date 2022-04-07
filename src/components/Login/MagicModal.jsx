import React, { useState } from 'react';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import { useDispatch } from 'react-redux';
import { setProvider } from '../../store/appSlice';
import { toast } from 'react-toastify';

let magic;

if (typeof window !== 'undefined') {
  magic = new Magic('pk_live_706CBCFD8CA20693', {
    extensions: [new OAuthExtension()],
  });
}

const MagicModal = ( {setModal} ) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function connect( type ) {
    
    const validEmail = /\S+@\S+\.\S+/;
    setLoading(true);
    
    if (type === 'email' && email.length && validEmail.test(email)) {
      await magic.auth.loginWithMagicLink({email, redirectURI: `${window.location.origin}`});
      magic.network = 'matic';
    }
    if (type === 'google') {
      console.log('----------------------------------------')
      console.log(magic);

      await magic.oauth.loginWithRedirect({
        provider   : 'google' /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: `${window.location.origin}`,
      });
    }
    if (type === 'twitter') {
      await magic.oauth.loginWithRedirect({
        provider   : 'twitter' /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: `${window.location.origin}`,
        scope      : ['user:email'] /* optional */,
      });
    }
    if (type === 'discord') {
      await magic.oauth.loginWithRedirect({
        provider   : 'discord' /* 'google', 'facebook', 'apple', or 'github' */,
        redirectURI: `${window.location.origin}`,
        scope      : ['user:email'] /* optional */,
      });
    }
    
  }
  
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-3 pb-4 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Magic link e-mail
          </label>
          <input
            onChange={( e ) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email" placeholder="E-mail"/>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => connect('email')} className="bg-indigo-500 hover:bg-blue-700 text-white py-2 px-3 rounded focus:outline-none' +
            ' focus:shadow-outline"
                  type="submit">
            {
              loading
                ? <div className="flex items-center justify-center ">
                  <div className="w-5 h-5 mx-1 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"/>
                  <p>Connecting</p>
                </div>
                : <p>Connect with email</p>
            }
          </button>
        </div>
        
        <p className="mb-4 mt-2 text-center">OR</p>
        <hr className="block w-full mb-4 border-0 border-t border-gray-300"/>
        
        <div className="flex flex-wrap justify-between">
          <div className=" sm:pr-2 mb-3 sm:mb-0">
            <button
              onClick={() => connect('twitter')}
              className="flex items-center hover:bg-blue-100 text-black border border-solid py-2 px-4 focus:outline-none rounded focus:shadow-outline"
              type="button"
            >
              <img className={'mr-3'} src="https://img.icons8.com/color/20/000000/twitter--v1.png"/>
              Twitter
            </button>
          </div>
          <div className=" sm:pl-2">
            <button
              onClick={() => connect('google')}
              className="flex items-center hover:bg-red-100 text-black border border-solid py-2 px-4 focus:outline-none rounded focus:shadow-outline"
              type="button"
            >
              <img className={'mr-3'} src="https://img.icons8.com/color/20/000000/google-logo.png"/>
              Google
            </button>
          </div>
          <div className=" sm:pl-2">
            <button
              onClick={() => connect('discord')}
              className="flex items-center hover:bg-indigo-100 border border-solid text-black py-2 px-4 focus:outline-none rounded focus:shadow-outline"
              type="button"
            >
              <img className={'mr-3'} src="https://img.icons8.com/color/20/000000/discord--v2.png"/>
              Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicModal;