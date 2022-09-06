
import "./nftBalance.css"
import { useState, useEffect } from "react";
import NftBalance from "./NftBalance"
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

// import { Contract } from "@ethersproject/contracts";
// import { formatUnits } from "@ethersproject/units";
// import MFAbi from "../abi/MFAbi.json";


export default function NftList({ chainId }) {

    // _____ below code for retrieving NFT token ids without api ______________
    // const addressContract = "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b";

    // const { account, active, library } = useWeb3React();
    // const contract = new Contract(addressContract, MFAbi, library.getSigner());

    // const getTokenIds = async () => {
    //     const myTokenIds = [];
    //     const nftsMinted =
    //         await contract.nftsMinted()
    //             .then(res => console.log(formatUnits(res._hex, 0)))
    // };
    // getTokenIds()
    // ________________________________________________________________________

    const { account } = useWeb3React();
    const [myNfts, setMyNfts] = useState(null);

    const fetchMyNfts = () => {
        axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${account}&order_direction=desc&offset=0&limit=20&include_orders=false`)
            .then(res => setMyNfts(res.data.assets))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchMyNfts()
    }, [account])

    // add opensea links to the nfts in your wallet

    return (
        <div>
            <div className="nftsContainer">
                {
                    myNfts?.length ? myNfts.map(nft => (
                        <div key={nft.id}>
                            <div className="imageBorder">
                                <img src={nft.image_url} alt="nft" className="nftImage" />
                                <div> {nft.collection.name.length > 15 ? `${nft.collection.name.slice(0, 15)}...` : nft.collection.name} </div>
                                <div> {nft.token_id} </div>
                            </div>
                        </div>
                    ))
                        :
                        <div>
                            <h2>
                                No NFTs found in this wallet
                            </h2>
                        </div>
                }
            </div>


            {/* {chainId === 42 && <NftBalance tokenId={1449261} />}   */}
        </div>
    )
}

