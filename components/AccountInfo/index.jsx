import React, { useState } from "react";

function AccountInfo({handleLogout, privKey, walletInfo}) {
    const [privateKeyHidden, setPkeyVisiblity] = useState(false);
 return (
    <div className={'container'}>
        <div
            className="lg:flex lg:items-center lg:justify-between"
        >
          <h2>Openlogin x Polygon</h2>
          <button key="1" type="primary" onClick={()=>handleLogout(false)}>
            Logout
          </button>
          <button key="1" type="primary" onClick={()=>handleLogout(true)}>
            Sleep (Fast Login enabled)
          </button>
        </div>
        <div className="container">
            <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
            <div style={{margin:20}}>
                Wallet address: <i>{walletInfo?.address}</i>
            </div>
            <div style={{margin:20}}>
                Matic ERC20 token Balance: <i>{walletInfo?.balance}</i>
            </div>
            <div style={{margin:20}}>
            {
                !privateKeyHidden ? 
                <div style={{margin:20, maxWidth: 900, wordWrap: "break-word", display:"flex", flexDirection:"column"}}>
                  <span style={{margin: 20}}>{"********************************"}</span>
                  <button onClick={()=>{setPkeyVisiblity(true)}}>Show Private Key</button>
                </div>:
                <div style={{margin:20, maxWidth: 900, wordWrap: "break-word", display:"flex", flexDirection:"column"}}>
                 <span style={{margin: 20}}>{(privKey)}</span>
                  <button onClick={()=>{setPkeyVisiblity(false)}}>Hide Private Key</button>
                </div>
              }
                        </div>
            </div>
        </div>
  </div>
 )
}

export default AccountInfo;