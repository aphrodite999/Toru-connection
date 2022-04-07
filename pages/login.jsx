import React, { useEffect, useState } from 'react';
import MagicModal from '../src/components/Login/MagicModal';
import Modal from '../src/components/Modal';
import { useSelector } from 'react-redux';

const Login = ({router}) => {
  const [modal, setModal] = useState( false);
  const provider = useSelector(state => state.app.provider)
  
  useEffect(() => { 
    if(provider) router.push('/creator-dashboard')
  },[provider])
  
  return (
    <div className="wrapper w-full ">
      <Modal
        onRequestClose={() => setModal(false)}
        isOpen={modal}
      ><MagicModal setModal={setModal}/></Modal>
      <div
        className="max-w-sm bg-gray-100 px-3 py-5 rounded shadow-lg my-10 m-auto"
      >
        <div className="text-center uppercase text-indigo-400 font-bold text-xl"></div>
        <hr className={'my-4'}/>
        <div className="flex flex-col mt-3 space-y-3">
        <button
            className={'flex items-center justify-center border hover:bg-gray-200 border-solid py-2 px-4 ' +
            'focus:outline-none rounded focus:shadow-outline'}
           > &nbsp;
            </button>
            <button
            className={'flex items-center justify-center border hover:bg-gray-200 border-solid py-2 px-4 ' +
            'focus:outline-none rounded focus:shadow-outline'} 
           > &nbsp;
            </button>
          <button
            className={'flex items-center justify-center border hover:bg-gray-200 border-solid py-2 px-4 ' +
            'focus:outline-none rounded focus:shadow-outline'} 
           > &nbsp;
            </button>
        </div>
      </div>
    </div>

  );
};

export default Login;