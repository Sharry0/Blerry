
import { useState, useEffect } from "react";
import useToggleState from "../hooks/useToggleState";
import axios from "axios";


export default function Bundles() {

    const [bundlesData, setBundlesData] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const [runEffect, setRunEffect] = useToggleState(true);

    useEffect(() => {
        getBundlesDate();
    }, [runEffect]);
    
    const getBundlesDate = async () => {
        axios.get(`https://testnets-api.opensea.io/api/v1/bundles?limit=${limit}&offset=${offset}`)
            .then(res => setBundlesData(res.data))
            .catch(err => console.log(err));
    };

    return (
        <div id="bundleComponent">

            <main id="bundlesContainer">
                <div>
                    
                </div>


            </main>

        </div>
    )
}
