
import { useState, useEffect } from "react";
import axios from "axios";


export default function Bundles() {

    const [bundlesData, setBundlesData] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        const getBundlesDate = async () => {
            axios.get(`https://testnets-api.opensea.io/api/v1/bundles?limit=${limit}&offset=${offset}`)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        };
    }, []);

    return (
        <div>Bundles</div>
    )
}
