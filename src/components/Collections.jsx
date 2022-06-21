
import "../components/styles/rankings.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Collections() {

    const [collectionsData, setCollectionsData] = useState(null);
    const [offset, setOffset] = useState(600)
    const [limit, setLimit] = useState(300)

    useEffect(() => {
        getCollectionData()
    }, [])
    
    const getCollectionData = async () => {
        await axios.get(`https://testnets-api.opensea.io/api/v1/collections?offset=${offset}&limit=${limit}`)
        // .then(res=>console.log(res.data.collections))
        .then(res=>console.log(res.data.collections[0]))
        // .then(res=>console.log(res.data.collections[2].primary_asset_contracts[0]))
        .catch(err=> console.log(err))
    }

    return (
        <div id="rankingsComponent">
            <h1 style={{ color: "#aaa" }}>Collections on the way...</h1>
            <div>

            </div>


        </div>
    )
}
