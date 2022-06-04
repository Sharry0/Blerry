
import "../components/styles/rankings.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Rankings() {

    const [rankingsData, setRankingsData] = useState(null);

    useEffect(() => {
        const fetchRanking = async () => {
            await axios.get("https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&include_orders=false")
                .then(res => {
                    setRankingsData(res.data.assets)
                    console.log(res.data.assets[0])
                })
                .catch(err => console.log(err))
        }
        fetchRanking();
    }, [])


    return (
        <div id="rankingsComponent">
            rankgings
            <div>
                {
                    rankingsData && rankingsData.map(asset => (
                        <div key={asset.id}>
                            {/* <h4>something</h4> */}
                            <p>{asset.permalink}</p>
                            {/* {console.log(asset.permalink)} */}
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
