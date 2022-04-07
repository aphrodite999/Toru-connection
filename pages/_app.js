import '../src/styles/globals.css';
import DashboardStyle from  "../src/styles/dashboard.css";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';


import dynamic from 'next/dynamic';
const NoSSRNavidation = dynamic(() => import('../src/components/Navigation'), {
  ssr: false,
});

function Main( {Component, pageProps, router} ) {
  

  return (
    <>
      <Provider store={store}>
        <NoSSRNavidation router={router}/>
        <ToastContainer/>
        <Component router={router} {...pageProps} />
      </Provider>
    </>
  );
}

export default Main;
export {DashboardStyle}