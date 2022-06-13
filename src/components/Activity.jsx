
import "../components/styles/activity.css"
import axios from "axios";
import { useState, useEffect } from "react"
import WethIcon from "../images/icons/WETH_icon.svg"
import EthIcon from "../images/icons/ETH_icon.svg"
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

    const convertToPrice = (decimal = 18, totalPrice) => {

        if (totalPrice === "0") return "0";

        if (totalPrice.length < 19) {
            const convertNum = totalPrice.padStart(18, 0);
            const beforeDecimal = "0";
            return parseFloat(beforeDecimal.concat(".", convertNum));
        };

        if (totalPrice.length >= 19) {
            const beforeDecimal = totalPrice.slice(0, totalPrice.length - decimal);
            const afterDecimal = totalPrice.slice(totalPrice.length - decimal);
            return parseFloat(beforeDecimal + "." + afterDecimal);
        };
    };

    const getTransactionTime = (sellTime) => {

        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
        const sellTimeInMillisec = Date.parse(sellTime + "Z");
        const timeNow = Date.now();
        const timeAgo = timeNow - sellTimeInMillisec;

        // if timeAgo is smaller than 1 min
        if (timeAgo < 60000) return rtf.format(-(Math.floor(timeAgo / 1000)), "second");;

        // if timeAgo is smaller than 1 hour
        if (timeAgo < 3600000) return rtf.format(-(Math.floor(timeAgo / 60000)), "minute");

        // if timeAgo is smaller than 1 day
        if (timeAgo < 86400000) return rtf.format(-(Math.floor(timeAgo / 3600000)), "hour");;

        // if timeAgo is smaller than 1 month
        if (timeAgo < 2628000000) return rtf.format(-(Math.floor(timeAgo / 86400000)), "day");

        // if timeAgo is smaller than 1 year
        if (timeAgo < 31526000000) return rtf.format(-(Math.floor(timeAgo / 2628000000)), "month");

        // if timeAgo is bigger than 1 year
        if (timeAgo > 31526000000) return rtf.format(-(Math.floor(timeAgo / 31526000000)), "year");
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
                            <div id="infoSection">

                                <div className="infoRows">From: {event.seller.address.slice(0, 6)}...{event.seller.address.slice(38)}</div>
                                <div className="infoRows" id="priceSection">
                                    <span>Price: {convertToPrice(18, event.total_price)}</span>
                                    <img src={event.payment_token.symbol === "WETH" ? WethIcon : EthIcon } alt="" id="priceSymbol" />
                                </div>
                                <div className="infoRows">To: {event.winner_account.address.slice(0, 6)}...{event.winner_account.address.slice(38)}</div>
                                <div className="infoRows"> {getTransactionTime(event.event_timestamp)} </div>
                                {
                                    event?.asset?.permalink ? <a href={event?.asset?.permalink} className="openseaLink"> Link to opensea</a>
                                        : event?.asset_bundle?.permalink && <a href={event?.asset_bundle?.permalink} className="openseaLink"> Link to opensea</a>
                                }
                            </div>
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
