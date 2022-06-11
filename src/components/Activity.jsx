
import "../components/styles/activity.css"
import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import noImage from "../images/no_image.png"

export default function Activity() {

    const [activityData, setActivityData] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [previousCursor, setPreviousCursor] = useState(null);

    const limit = 20;
    const eventType = "successful";
    const occuredBefore = "1654330968"; // Unix timestamp 04.06.22 10:22 Uhr
    const occuredAfter = "1654330968"; // Unix timestamp 04.06.22 10:22 Uhr

    useEffect(() => {
        getEventsData();
        console.log("effect running")
    }, []);

    const getEventsData = async (cursor = false) => {
        // await axios.get(`https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&offset=${offset}&limit=${limit}&occurred_before=${occuredBefore}&occurred_after=${occuredAfter}`)
        await axios.get(
            `https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`
        )
            .then(res => {
                setActivityData(res?.data?.asset_events)
                setPreviousCursor(res?.data?.previous)
                setNextCursor(res?.data?.next)
                // console.log(res.data)
            })
            .catch(err => console.log("ERRORR", err))
    };

    return (
        <div id="activityComponent">
            {/* __________ Container of all events ______________________________________________ */}
            <div id="eventsContainer">
                {
                    activityData && activityData.map(event => (
                        <div className="event card" key={event.id} >
                            {/* __________ Container of a single event (NFT) ____________________ */}
                            <div id="imgSection">
                                <div id="imgOutline">
                                    {/* __________ Image section of the cards ___________________ */}
                                    {
                                        event?.asset?.image_preview_url ?
                                            <img
                                                src={event?.asset?.image_preview_url}
                                                alt="NFT"
                                                className="img"
                                            />
                                            : event.asset_bundle ?
                                                <div>
                                                    <img
                                                        src={
                                                            event.asset_bundle.assets[0].image_preview_url ?
                                                                event.asset_bundle.assets[0].image_preview_url
                                                                : noImage
                                                        }
                                                        alt="NFT"
                                                        className="imgBundle"
                                                    />
                                                    <img
                                                        src={
                                                            event.asset_bundle.assets[1].image_preview_url ?
                                                                event.asset_bundle.assets[0].image_preview_url
                                                                : noImage
                                                        }
                                                        alt="NFT"
                                                        className="imgBundle"
                                                    />
                                                </div>
                                                :
                                                <img src={noImage} alt="No pic available" className="img" />
                                    }
                                </div>
                            </div>
                            <p>From: {event.seller.address.slice(2, 6)}...{event.seller.address.slice(10)}</p>
                            <p>Price: {event.payment_token?.eth_price}</p>
                            <p>To: {event.winner_account.address.slice(2, 6)}...{event.winner_account.address.slice(10)}</p>

                            {
                                event?.asset?.permalink ? <a href={event?.asset?.permalink}> Link to opensea</a>
                                    : event?.asset_bundle?.permalink && <a href={event?.asset_bundle?.permalink}> Link to opensea</a>
                            }
                        </div>
                    ))
                }
            </div>
            <div id="pageBtns">
                {/* __________ Previous button ______________________________________ */}
                <button
                    disabled={previousCursor === null ? true : false}
                    onClick={() => getEventsData(previousCursor)}
                    className="pageButton "
                >
                    prev
                </button>
                {/* __________ Next button ______________________________________ */}
                <button
                    disabled={nextCursor === null ? true : false}
                    onClick={() => getEventsData(nextCursor)}
                    className="pageButton "
                >
                    next
                </button>
            </div>

        </div>
    )
};
