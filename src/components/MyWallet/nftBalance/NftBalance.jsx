

import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts"
// import {formatUnits } from "@ethersproject/units"
import MFAbi from "../abi/MFAbi.json"
import ERC20ABI from "../abi/erc20Abi.json"
import { fetcher } from '../utils';
import useSWR from 'swr';


export default function NftBalance({ tokenId }) {

    const addressContract = "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b";
    // console.log(tokenId)

    const { account, active, library } = useWeb3React()
    const [itemInfo, setItemInfo] = useState()

    // const { data: nftURI } = useSWR([addressContract, 'tokenURI', 1449261])
    const { data, error } = useSWR([addressContract, 'tokenURI', 1449261], {
        fetcher: fetcher(library, MFAbi)
    });
    const contract = new Contract(addressContract, MFAbi, library)

    console.log(data)
    

    // console.log(await contract.tokenURI(tokenId))

    useEffect(() => {
        // if (!nftURI) return
        if (!data) return
        const contract = new Contract(addressContract, MFAbi, library)
        const fromMe = contract.filters.Transfer(account, null)

        // console.log(contract)
        // library.on(fromMe, (from, to, amount, event) => {
        //     console.log('Transfer|sent', { from, to, amount, event })
        //     mutate(undefined, true)
        // })

        // const toMe = contract.filters.Transfer(null, account)
        // library.on(toMe, (from, to, amount, event) => {
        //     console.log('Transfer|received', { from, to, amount, event })
        //     mutate(undefined, true)
        // })

        // remove listener when the component is unmounted
        return () => {
            // library.removeAllListeners(toMe)
            // library.removeAllListeners(fromMe)
        }
        // some()
    }, [])


    return (
        <div>
            
            {error && console.log(error)}
        </div>
    )
}

