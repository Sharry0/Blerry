

import axios from "axios";
import { useState, useEffect } from "react"

export default function Activity() {

    const [activityData, setActivityData] = useState(null);

    const offset = 0;
    const limit = 20;
    const eventType = "successful";
    const occuredBefore = "1654330968" // Unix timestamp 04.06.22 10:22 Uhr
    const occuredAfter = "1654330968" // Unix timestamp 04.06.22 10:22 Uhr

    useEffect(() => {

        const getEventsData = async () => {
            // await axios.get(`https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&offset=${offset}&limit=${limit}&occurred_before=${occuredBefore}&occurred_after=${occuredAfter}`)
            await axios.get(`https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&offset=${offset}&limit=${limit}`)
            .then(res=> {
                setActivityData(res?.data?.order)
                console.log(res)})
            .catch(err => console.log("ERRORR",err))
        }
        // getEventsData();

    }, [])


    return (
        <div id="activityComponent">



        </div>
    )
}
