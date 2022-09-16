
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

    return (
        <div>


        </div>
    )
}
