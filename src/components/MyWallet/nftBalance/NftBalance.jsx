
import "./nftBalance.css"
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import MFAbi from "../abi/MFAbi.json"
import { fetcher } from '../utils';
import { Contract } from "@ethersproject/contracts";
import axios from 'axios';
import useSWR from 'swr';


export default function NftBalance({ tokenId }) {

    const addressContract = "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b";

    const { library } = useWeb3React();
    const [itemInfo, setItemInfo] = useState(null);

    const { data: nftURI } = useSWR([addressContract, 'tokenURI', tokenId], {
        fetcher: fetcher(library, MFAbi)
    });

    const getItemInfo = async () => {
        await axios.get(nftURI)
            .then(res => {
                setItemInfo({
                    name: res.data.name,
                    imageURL: res.data.image,
                    description: res.data.description
                })
            })
            .catch(err => console.log(err));
            // console.log(await contract.nftsMinted(), "this is log")
    };

    useEffect(() => {
        if (!nftURI) return;
        getItemInfo()
         
        console.log("running")
    }, [nftURI]);


    return (
        <div>
            <img src={itemInfo?.imageURL} className="nftImage" alt="" />
        </div>
    )
}

