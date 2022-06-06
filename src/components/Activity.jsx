
import "../components/styles/activity.css"
import axios from "axios";
import { useState, useEffect } from "react"

import noImage from "../images/no_image.png"

export default function Activity() {

    const [activityData, setActivityData] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [previousCursor, setPreviousCursor] = useState(null);

    const limit = 50;
    const eventType = "successful";
    const occuredBefore = "1654330968" // Unix timestamp 04.06.22 10:22 Uhr
    const occuredAfter = "1654330968" // Unix timestamp 04.06.22 10:22 Uhr

    useEffect(() => {

        const getEventsData = async () => {
            // await axios.get(`https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&offset=${offset}&limit=${limit}&occurred_before=${occuredBefore}&occurred_after=${occuredAfter}`)
            await axios.get(`https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&limit=${limit}`)
                .then(res => {
                    setActivityData(res?.data?.asset_events)
                    console.log(res.data.asset_events)
                })
                .catch(err => console.log("ERRORR", err))
        }
        // getEventsData();

    }, [])


    return (
        <div id="activityComponent">
            <h3>activit</h3>
            <div id="eventsContainer">
                {
                    activityData && activityData.map(event => (
                        <div className="event card" key={event.id} >
                            <img src={event.asset.image_thumbnail_url ? event.asset.image_thumbnail_url : noImage} alt="" style={{ height: "100px", width: "100px" }} />
                            <p>{event.asset.permalink}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
