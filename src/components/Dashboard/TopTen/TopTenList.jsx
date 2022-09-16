
import css from "./TopTenList.module.css"
import { useState, useEffect } from "react";
import axios from "axios";


export default function TopTenList() {

    const [topTenData, setTopTenData] = useState(false);
    const [currency, setCurrency] = useState("usd");

    const getTopTen = () => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`)
            .then(res => setTopTenData(res.data))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getTopTen();
    }, [])
    console.log(topTenData)
    return (
        <div className="topTenComponent">
            <div className="chart">
                <div className={css.catRow}>
                    <span className={css.catRank}>{"#"}</span>
                    <span className={css.catName}>Coin</span>
                    <span className={css.catPrice}>Price</span>
                    <span className={css.catChange}>24h</span>
                    <span className={css.catCap}>Market Cap</span>
                </div>
                {
                    topTenData && topTenData?.map((data, i) => (
                        <div key={data.id} className={i < 9 ? css.borderBottom : css}>
                            <div className={css.coin}>
                                <span className={css.rank}>{`${data.market_cap_rank}.`}</span>
                                <span className={css.name}>
                                    <img src={data.image} alt="coin / token" style={{ heigh: "20px", width: "20px" }} />
                                    <span className={css.name}>{data.name}</span>
                                    <span className={css.symbol}>{data.symbol}</span>
                                </span>
                                <span className={css.price}>{`${data.current_price}$`}</span>
                                <span className={css.priceChange}>{`${data.price_change_percentage_24h.toFixed(2)}%`}</span>
                                <span className={css.marketCap}>{`${data.market_cap}$`}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
