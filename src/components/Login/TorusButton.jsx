import React from 'react';
import Torus from "@toruslabs/torus-embed";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setProvider } from '../../store/appSlice';


const TorusButton = () => {
  const dispatch = useDispatch()
  
  async function connect() {
    const torus = new Torus();
    await torus.init();
    const login = await torus.login();
    dispatch(setProvider({
      provider: torus.provider,
      address: login[0]
    }))
    toast.success(`Wallet connected with address ${login[0]}`);
  }
  return (
    <button
      className={' flex items-center justify-center border border-solid' +
      'hover:bg-gray-200 py-2 px-4 focus:outline-none rounded focus:shadow-outline'}
      onClick={connect}
    >
      One-Click Wallet 🖱</button>
  );
};

export default TorusButton;