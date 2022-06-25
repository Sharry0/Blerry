
import styles from "./styles/bundles.module.css"
import { useState, useEffect, useRef } from "react";
import useToggleState from "../hooks/useToggleState";
import OpenseaImage from "../images/OpenseaDark.svg"
import noImage from "../images/no_image.png"
import axios from "axios";


export default function Bundles() {
    const topActivity = useRef(null)

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
        <div className={styles.bundlesComponent}>

            <main className={styles.bundlesContainer}>
                <div ref={topActivity}></div>
                {
                    bundlesData && bundlesData.map((bundle, i) => (
                        <div className={styles.bundle} key={i}>
                            <div className={styles.imagesContainer}>
                                {
                                    bundle?.assets?.map((asset, i) => (
                                        <div key={asset.id}>
                                            {
                                                i <= 1 &&
                                                <img
                                                    src={asset.image_url ? asset.image_url : noImage}
                                                    alt="asset"
                                                    className={styles.assetImg}
                                                />
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.infoSection}>
                                {/* _______ end of the sale ________________________________________ */}
                                <div className={styles.infoRows}>
                                    {
                                        bundle?.sell_orders ?
                                        <div>
                                            {/* _______ timeStamp ___________________________ */}
                                            <div className={styles.saleEndDate}>
                                                {`Sale ends on ${new Date(bundle.sell_orders[0].closing_date).toLocaleString().slice(0,16)} UTC`}
                                            </div>
                                        </div>
                                        :
                                        <div className={styles.saleEndDate}>
                                            Sale has ende
                                        </div>
                                    }
                                </div>
                                {/* _______ bundle name ________________________________________ */}
                                <div className={styles.infoRows}>
                                    {
                                        bundle?.name.length > 30 ? `${bundle.name.slice(0, 30)}...` : bundle?.name
                                    }
                                </div>

                                <div>
                                    <a href={bundle.permalink} target="_blank" rel="noreferrer">
                                        <img src={OpenseaImage} alt="Opensea Link" className={styles.openseaLink} />
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


                    className="pageButton "
                >
                    prev
                </button>
                {/* __________ Next button ______________________________________ */}
                <button


                    className="pageButton"
                >
                    next
                </button>
            </div>
        </div>
    )
}
