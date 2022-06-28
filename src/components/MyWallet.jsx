
import "./styles/myWallet.css"
import { useEffect, useState } from "react"

export default function MyWallet() {

  const [accounts, setAccounts] = useState(null)
  const [connecting, setConnecting] = useState(false)

  const requestAccounts = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(res => setAccounts(res))
      .catch(err => console.log(err))
  }

  const connectMetaMask = async () => {
    setConnecting(true)
    // ____ if MetaMask isn't installed on the current browser, _______
    // ____  alert the user to install it and end this function _______
    if (typeof window.ethereum === "undefined") {
      alert(`Please install the MetaMask browser extention`)
      return setConnecting(false)
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        // params: [{ chainId: '0x1' }], // __ ETH chainId ___
        params: [{ chainId: '0x4' }], // __ Rinkeby Testnet chainId ___
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        // ____ Add Rinkeby testnetwork to MM wallet ________
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x4',
                chainName: 'Rinkeby Testnet',
                rpcUrls: ['https://rinkeby.infura.io/v3/'],
                nativeCurrency: {
                  name: "Rinky Eth",
                  symbol: "RinkebyETH", // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: ["https://https://rinkeby.etherscan.io.io"]
              },
            ],
          });
          // ____ Add ethereum mainnet to MM wallet ______ (COLLAPSED)!!!!!!!
          // await window.ethereum.request({
          //   method: 'wallet_addEthereumChain',
          //   params: [
          //     {
          //       chainId: '0x1',
          //       chainName: 'Ethereum Mainnet',
          //       rpcUrls: ['https://mainnet.infura.io/v3/'],
          //       nativeCurrency: {
          //         name: "Eth",
          //         symbol: "ETH", // 2-6 characters long
          //         decimals: 18,
          //       },
          //       blockExplorerUrls: ["https://etherscan.io"]
          //     },
          //   ],
          // });
        } catch (addError) {
          console.log(addError)
        }
      }
      // handle other "switch" errors
    }

    // ____ to request account/wallet from MM and save it in accounts state ____________
    if (typeof window.ethereum !== 'undefined') {
      await requestAccounts();
      return setConnecting(false)
    }
  }

  const checkIsConnected = async () => {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(res=> res[0] && requestAccounts())
      .catch(err => console.log(err))
  }

  useEffect(() => {
    checkIsConnected();
    console.log("effect runninfrs")
  }, [])

  // console.log(window.ethereum.isConnected())


  return (
    <div className="myWalletComponent">
      <div className="walletContainer">

        {
          accounts ?
            <div className="walletSection">
              is Connected
            </div>
            :
            <div className="connectWalletSection">
              <button onClick={connectMetaMask} disabled={connecting} className="pageButton">
                {
                  !connecting ? "Connect to MetaMask" : "Connecting"
                }
              </button>
            </div>
        }
      </div>
    </div>
  )
}

