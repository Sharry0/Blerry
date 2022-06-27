
import { useState } from "react"

export default function MyWallet() {

  const [accounts, setAccounts] = useState(null)

  const connectMetaMask = async () => {

    // ____ if MetaMask isn't installed on the current browser, _______
    // ____  alert the user to install it and end this function _______
    if (typeof window.ethereum === "undefined") return alert("please install MetaMask")

    // ____ to check if MetaMask is installed to the current browser ____________
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is ready!');
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => setAccounts(res))
        .catch(err => console.log(err))


    }
  }





  return (
    <div>
      <h1 style={{ color: "#aaa" }}>Connect your wallet in the near future</h1>
      <button onClick={connectMetaMask}> Connect MetaMask</button>
    </div>
  )
}

