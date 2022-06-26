
import "./styles/bundles.css"
import { useState, useEffect, useRef } from "react";
import useToggleState from "../hooks/useToggleState";
import OpenseaImage from "../images/OpenseaDark.svg"
import noImage from "../images/no_image.png"
import WethIcon from "../images/icons/WETH_icon.svg"
import EthIcon from "../images/icons/ETH_icon.svg"
import axios from "axios";


export default function Bundles() {

    const topActivity = useRef(null)

    const [bundlesData, setBundlesData] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(40);
    const [runEffect, toggleRunEffect] = useToggleState(true);

    useEffect(() => {
        getOdersData()
    }, [runEffect]);

    const getOdersData = async () => {
        await axios.get(`https://testnets-api.opensea.io/wyvern/v1/orders?bundled=true&include_bundled=false&side=1&limit=${limit}&offset=${offset}&order_by=created_date&order_direction=desc`)
            .then(res => setBundlesData(res.data.orders))
            .catch(err => console.log(err));
        topActivity?.current?.scrollIntoView();
    };
    
    const convertToPrice = (totalPrice, decimal = 18) => {

        const cleanedPrice = parseInt(totalPrice).toString();

        if (cleanedPrice === "0") return "0";

        if (cleanedPrice?.length < 19) {
            if (cleanedPrice?.length < 16) return "< 0.001"
            const convertNum = cleanedPrice.padStart(18, 0);
            const beforeDecimal = "0";
            const price = parseFloat(beforeDecimal.concat(".", convertNum));
            if (price.toString().length > 5) return price.toPrecision(1);
            return price
        };

        if (cleanedPrice?.length >= 19) {
            const beforeDecimal = cleanedPrice.slice(0, cleanedPrice.length - decimal);
            const afterDecimal = cleanedPrice.slice(cleanedPrice.length - decimal);
            const afterDecimalFloat = parseFloat("0." + afterDecimal);
            if (afterDecimalFloat.toString().length > 5) return parseFloat(beforeDecimal + "." + afterDecimal).toPrecision(5)
            return parseFloat(beforeDecimal + "." + afterDecimal);
        };
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
                        <div className="bundle" key={bundle.id}>
                            {/* _______ bundle images ______________ */}
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
                                        bundle?.asset_bundle?.name.length > 30 ? `${bundle?.asset_bundle?.name.slice(0, 30)}...` : bundle?.asset_bundle?.name
                                    }
                                </div>

                                {/* _______ Price of the bundle  ______________________________________________________________ */}
                                <div className="infoRows" id="priceSection">
                                    <span>
                                        Price: {
                                            bundle.current_price ?
                                                convertToPrice(bundle.current_price, bundle?.payment_token_contract?.decimals)
                                                    : "---"

                                        }
                                    </span>
                                    {/* _______ Price symbol of the NFT  ______________________________________________________________ */}
                                    <img src={bundle?.payment_token_contract?.symbol === "WETH" ? WethIcon : bundle?.payment_token_contract?.symbol === "SAND" ? "Sand" : EthIcon} alt="price symbol" id="priceSymbol" />
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
