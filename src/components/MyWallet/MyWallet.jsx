
import "./myWallet.css"
import { useEffect, useState } from "react"
import { injected } from "./wallet/connectors"
import { useWeb3React } from "@web3-react/core"
import EthBalance from "./EthBalance"
import TokenBalance from "./TokenBalance"

export default function MyWallet() {

  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  // ___ check if MM has been connected to this site before if so, reconnect them ____
  const checkIsConnected = async () => {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(res => res[0] && activate(injected))
      .catch(err => console.log(err))
  }

  console.log(useWeb3React())
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') checkIsConnected();
    console.log("effect runninfrs")
  }, [])

  // _____ connect website to wallet ______________
  const connect = async () => {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }
  // _____ disconnect website to wallet ____________
  const disconnect = async () => {
    try {
      await deactivate(injected)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="myWalletComponent">
      <div className="walletContainer">

        {
          active ?
            <div className="ethBalance">
              {account} is Connected
              <EthBalance />

            </div>
            :
            <div className="connectWalletSection">
              <button onClick={connect} className="pageButton">
                Connect to MetaMask
              </button>
            </div>
        }
      </div>
    </div>
  )
}
