

import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import MFAbi from "../abi/MFAbi.json"
import { fetcher } from '../utils';
import useSWR from 'swr';
import { base64 } from 'ethers/lib/utils';


export default function NftBalance({ tokenId }) {

    const addressContract = "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b";


    const { account, active, library } = useWeb3React();
    const [itemInfo, setItemInfo] = useState(null);

    const { data: nftURI } = useSWR([addressContract, 'tokenURI', 1449261], {
        fetcher: fetcher(library, MFAbi);
    });

    // console.log(nftURI)

    useEffect(() => {
        if (!nftURI) return;
        
        

        const data = base64.decode(nftURI.slice(21));

        console.log(data);
        console.log(nftURI);
        // console.log(`https://${nftURI.slice(21)}.ipfs.dweb.link`)

        fetch(`https://${nftURI.slice(21)}.ipfs.dweb.link`)
        .then(res=>console.log(res))
        // const itemInfo = JSON.parse(data)
        // const svg = base64.decode(itemInfo.image.slice(26))
        // setItemInfo({
        //   "name":itemInfo.name,
        //   "description":itemInfo.description,
        //   "svg":svg})

        // some()
    }, [nftURI]);


    return (
        <div>

            nft palance
            {/* <img src={itemInfo?.image} alt="" /> */}
        </div>
    )
}

