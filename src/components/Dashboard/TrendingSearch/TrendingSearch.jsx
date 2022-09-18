
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./TrendingSearch.module.css"
// import coinGeckoLogo from ""

export default function TrendingSearch() {

    const [trending, setTrending] = useState(false);

    const getTrendingData = () => {
        axios.get(`https://api.coingecko.com/api/v3/search/trending`)
            .then(res => setTrending(res.data.coins))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getTrendingData();
    }, []);
    console.log(trending)
    return (
        <div className="trendingComponent">
            <div className="chart">
                <div >
                    <span className={css.title}>{`Top trending coins on Coingecko search by users`}</span>
                </div>
                {
                    trending && trending.map((trend, i) => (
                        <div className={i < trending.length - 1 ? css.underline : css} key={i}>
                            <div className={css.trend}>

                                <div><b>{`${i + 1}.`}</b></div>

                                <img src={trend.item.small} alt="coin icon" className={css.image} />

                                <div><b>{trend.item.name}</b></div>
                                <div>{`(${trend.item.symbol})`}</div>

                                <div><b>{trend.item.market_cap_rank}</b></div>

                            </div>
                        </div>
                    ))
                }
                <div className={css.footer}>
                    <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
                        <img src="/Coingecko_logo_sm.png" alt="" className={css.coinGeckoLogo} />
                    </a>
                    <p>Data provided by</p>
                </div>
            </div>
        </div>
    )
}
