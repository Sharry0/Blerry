

import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import MFAbi from "../abi/MFAbi.json"
import { fetcher } from '../utils';

import useSWR from 'swr';


export default function NftBalance({tokenId}) {

    const addressContract = "0x32B80E878F0658EcA9b0d9D944e60e0c7B3289D0";

    const [itemInfo, setItemInfo] = useState()

    const { account, library } = useWeb3React()
    // const { data: nftURI } = useSWR([addressContract, 'tokenURI', 1449261])
    const { data: nftURI } = useSWR([addressContract, 'tokenURI', 1449261], {
        fetcher: fetcher(library, MFAbi),
      })

    console.log(nftURI)

    useEffect( () => {
        if(!nftURI) return
      
       
      
      },[nftURI])


    return (
        <div>NftBalance</div>
    )
}

