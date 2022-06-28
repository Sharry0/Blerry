
import "./styles/myWallet.css"
import { useEffect, useState } from "react"

export default function MyWallet() {

  const [accounts, setAccounts] = useState(null)
  const [connecting, setConnecting] = useState(false)

  const connectMetaMask = async () => {
    setConnecting(true)

    // ____ if MetaMask isn't installed on the current browser, _______
    // ____  alert the user to install it and end this function _______
    if (typeof window.ethereum === "undefined") {
      alert(`Please install the MetaMask browser extention`)
      return setConnecting(false)
    }

    // ____ to request account/wallet from MM and save it in accounts state ____________
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is ready!');
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => setAccounts(res))
        .catch(err => console.log(err))
      return setConnecting(false)
    }
  }

  // useEffect(()=>{
  //   connectMetaMask()
  // },[])



  return (
    <div className="myWalletComponent">
      <div className="walletContainer">

        {
          accounts ?
            <div>Connectedere</div>
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

