
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

    return (
        <div className="trendingComponent">
            <div className="chart">
                <div className={css.title}>
                    {`Trending coins search by users on Coingecko (24h)`}
                </div>
                <div className={css.catRow}>
                    <div className={css.name}>
                        <div>{`#`}</div>
                        <div>Name</div>
                    </div>
                    <div>Mkt Cap Rank</div>
                </div>
                {
                    trending && trending.map((trend, i) => (
                        <div className={i < trending.length - 1 ? css.underline : css} key={i}>
                            <div className={css.trend}>
                                <div className={css.name}>
                                    <div><b>{`${i + 1}.`}</b></div>

                                    <img src={trend.item.small} alt="coin icon" className={css.image} />

                                    <div><b>{trend.item.name}</b></div>
                                    <div className={css.symbol}>{`(${trend.item.symbol})`}</div>
                                </div>

                                <div><b>{trend.item.market_cap_rank}</b></div>
                            </div>
                        </div>
                    ))
                }
                <div className={css.footer}>
                    <p>Data provided by:</p>
                    <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">
                        <img src="/Coingecko_logo_sm.png" alt="" className={css.coinGeckoLogo} />
                    </a>
                </div>
            </div>
        </div>
    )
}
