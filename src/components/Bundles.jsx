
import "./styles/bundles.css"
import { useState, useEffect, useRef } from "react";
import useToggleState from "../hooks/useToggleState";
import OpenseaImage from "../images/OpenseaDark.svg"
import noImage from "../images/no_image.png"
import axios from "axios";


export default function Bundles() {
    const topActivity = useRef(null)

    const [bundlesData, setBundlesData] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(40);
    const [runEffect, toggleRunEffect] = useToggleState(true);

    useEffect(() => {
        // getBundlesData();
        getOdersData()
    }, [runEffect]);

    const getBundlesData = async () => {
        await axios.get(`https://testnets-api.opensea.io/api/v1/bundles?limit=${limit}&offset=${offset}`)
            .then(res => setBundlesData(res.data.bundles))
            .catch(err => console.log(err));
        topActivity?.current?.scrollIntoView();
    };
    const getOdersData = async () => {
        await axios.get(`https://testnets-api.opensea.io/wyvern/v1/orders?bundled=true&include_bundled=false&side=1&limit=50&offset=0&order_by=created_date&order_direction=desc`)
            .then(res => setBundlesData(res.data.orders))
            .catch(err => console.log(err));
        topActivity?.current?.scrollIntoView();
    };


    const handlePrevClick = () => {
        if (offset === 0) return
        if (offset > 0) setOffset(offset - limit);
        toggleRunEffect();
    }
    const handleNextClick = () => {
        setOffset(offset + limit);
        toggleRunEffect();
    }

    return (
        <div id="bundleComponent">

            <main id="bundlesContainer">
                <div ref={topActivity}></div>
                {
                    bundlesData && bundlesData.map(bundle => (
                        <div className="bundle card" key={bundle.id}>
                            <div id="imagesContainer">
                                {
                                    bundle?.asset_bundle?.assets?.map((asset, i) => (
                                        <div key={asset.id}>
                                            {
                                                i <= 1 &&
                                                <img
                                                    src={asset.image_url ? asset.image_url : noImage}
                                                    alt="asset"
                                                    className="assetImg"
                                                />
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div id="infoSection">
                                {/* _______ end of the sale ________________________________________ */}
                                <div>
                                    {
                                        bundle?.closing_date ?
                                            <div>
                                                {/* _______ timeStamp ___________________________ */}
                                                <div className="saleEndDate">
                                                    {`Sale ends on ${new Date(bundle?.closing_date).toLocaleString().slice(0, 16)} UTC`}
                                                </div>
                                            </div>
                                            :
                                            <div className="saleEndDate">
                                                Sale has ended
                                            </div>
                                    }
                                </div>
                                {/* _______ bundle name ________________________________________ */}
                                <div className="infoRows bundleName">
                                    {
                                        // bundle?.name.length > 30 ? `${bundle.name.slice(0, 30)}...` : bundle?.name
                                    }
                                </div>

                                <div>
                                    <a href={bundle?.asset_bundle?.permalink} target="_blank" rel="noreferrer">
                                        <img src={OpenseaImage} alt="Opensea Link" className="openseaLink" />
                                    </a>
                                </div>
                            </div>


                        </div>
                    ))

                }


            </main>
            <div id="pageBtns">
                {/* __________ Previous button ______________________________________ */}
                <button
                    disabled={offset === 0 ? true : false}
                    onClick={handlePrevClick}
                    className="pageButton"
                >
                    prev
                </button>
                {/* __________ Next button ______________________________________ */}
                <button
                    onClick={handleNextClick}
                    className="pageButton"
                >
                    next
                </button>
            </div>
        </div>
    )
}
