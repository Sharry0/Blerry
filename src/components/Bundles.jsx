
import "./styles/bundles.css"
import { useState, useEffect } from "react";
import useToggleState from "../hooks/useToggleState";
import axios from "axios";


export default function Bundles() {

    const [bundlesData, setBundlesData] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [runEffect, setRunEffect] = useToggleState(true);

    useEffect(() => {
        getBundlesDate();
    }, [runEffect]);

    const getBundlesDate = async () => {
        axios.get(`https://testnets-api.opensea.io/api/v1/bundles?limit=${limit}&offset=${offset}`)
            .then(res => setBundlesData(res.data.bundles))
            .catch(err => console.log(err));
    };

    return (
        <div id="bundleComponent">

            <main id="bundlesContainer">
                {
                    bundlesData && bundlesData.map( bundle => (
                        <div className="bundle card">
                                <div id="imagesContainer">
                                    {
                                        bundle?.assets?.map(asset=>(
                                            <img src={asset.image_url} alt="asset" className="assetImg" />
                                        ))
                                    }
                                </div>



                        </div>
                    ))
                   
                }


            </main>

        </div>
    )
}
