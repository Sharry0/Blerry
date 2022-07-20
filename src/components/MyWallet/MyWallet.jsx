
import "./myWallet.css";
import { useEffect } from "react";
import { injected } from "./wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { SWRConfig } from "swr";
import EthBalance from "./tokenBalance/EthBalance";
import TokenList from "./tokenBalance/TokenList";
import NftList from "./nftBalance/NftList";

export default function MyWallet() {

  const { active, account, activate, deactivate, chainId } = useWeb3React();

  // ___ check if MM has been connected to this site before if so, reconnect them ____
  const checkIsConnected = async () => {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(res => res[0] && activate(injected))
      .catch(err => console.log(err))
  }

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
            <div className="tokenBalance">
              <span id="connectedWallet">
                {account} is Connected <br />
              </span>
              <span id="chainId">
                ChainId: {chainId}
              </span>
              <SWRConfig>
                <EthBalance />
                <TokenList chainId={chainId} />
                <NftList chainId={chainId} />
              </SWRConfig>

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

