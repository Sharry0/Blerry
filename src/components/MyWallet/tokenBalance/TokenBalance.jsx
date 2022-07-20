
import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {formatUnits } from "@ethersproject/units";
import {Contract} from "@ethersproject/contracts";
import { fetcher } from "../utils";
import ERC20ABI from "../abi/erc20Abi.json";
import useSWR from "swr";


export default function TokenBalance  ({ symbol, address, decimals }) {
  const { account, library } = useWeb3React()
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account], {
    fetcher: fetcher(library, ERC20ABI)
  });

  useEffect(() => {
    // listen for changes on an Ethereum address
    // console.log(`listening for Transfer...`)
    const contract = new Contract(address, ERC20ABI, library.getSigner());
    const fromMe = contract.filters.Transfer(account, null);

    // console.log(contract)
    library.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|sent', { from, to, amount, event });
      mutate(undefined, true);
    });

    const toMe = contract.filters.Transfer(null, account);
    library.on(toMe, (from, to, amount, event) => {
      console.log('Transfer|received', { from, to, amount, event });
      mutate(undefined, true);
    });

    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners(toMe);
      library.removeAllListeners(fromMe);
    };
    // trigger the effect only on component mount
  }, []);

  if (!balance) {
    return <div>...</div>
  }
  return (
    <div>
      {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
    </div>
  )
}
