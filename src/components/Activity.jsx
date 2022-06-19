
import "../components/styles/activity.css"
import axios from "axios";
import { useState, useEffect, useRef, useReducer } from "react"
import WethIcon from "../images/icons/WETH_icon.svg"
import EthIcon from "../images/icons/ETH_icon.svg"
import OpenseaDark from "../images/OpenseaDark.svg"
import useToggleState from "../hooks/useToggleState"
import { Link } from "react-router-dom";

import noImage from "../images/no_image.png"

export default function Activity() {

    const topActivity = useRef(null)

    const eventReducer = (state, action) => {
        state.map(evt => {
            if (evt.name === action.type) {
                return evt.isActive = true
            }
            return evt.isActive = false
        })
        toggleRunEffect();
        toggleShowEventMenu();
        return state
    }

    const [activityData, setActivityData] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [previousCursor, setPreviousCursor] = useState(null);
    const [runEffect, toggleRunEffect] = useToggleState(true);
    const [showEventMenu, toggleShowEventMenu] = useToggleState(false);
    const [eventType, dispatchEventType] = useReducer(eventReducer, [
        {
            name: "created",
            isActive: false,
        },
        {
            name: "successful",
            isActive: true,
        },
        {
            name: "cancelled",
            isActive: false,
        },
        {
            name: "transfer",
            isActive: false,
        }
    ]);
    const [beforeDate, setBeforeDate] = useState();
    const [afterDate, setAfterDate] = useState();

    const limit = 50;

    useEffect(() => {
        getEventsData();
        console.log("effect running")
    }, [runEffect]);

    const getEventsData = async (cursor = false) => {
        // await axios.get(`https://testnets-api.opensea.io/api/v1/events?event_type=${eventType}&only_opensea=false&offset=${offset}&limit=${limit}&occurred_before=${occuredBefore}&occurred_after=${occuredAfter}`)
        await axios.get(
            `https://testnets-api.opensea.io/api/v1/events?event_type=${eventType.find(evt => evt.isActive).name}&only_opensea=false&limit=${limit}
            ${cursor ? `&cursor=${cursor}` : ""}

            `
        )
            .then(res => {
                setActivityData(res?.data?.asset_events)
                setPreviousCursor(res?.data?.previous)
                setNextCursor(res?.data?.next)
                // console.log(res.data)
            })
            .catch(err => console.log("ERRORR", err))
        topActivity?.current?.scrollIntoView()
    };


    const convertToPrice = (decimal = 18, totalPrice) => {

        if (totalPrice === "0") return "0";

        if (totalPrice?.length < 19) {
            if (totalPrice?.length < 16) return "< 0.001"
            const convertNum = totalPrice.padStart(18, 0);
            const beforeDecimal = "0";
            const price = parseFloat(beforeDecimal.concat(".", convertNum));
            if (price.toString().length > 5) return price.toPrecision(1);
            return price
        };

        if (totalPrice?.length >= 19) {
            const beforeDecimal = totalPrice.slice(0, totalPrice.length - decimal);
            const afterDecimal = totalPrice.slice(totalPrice.length - decimal);
            const afterDecimalFloat = parseFloat("0." + afterDecimal);
            if (afterDecimalFloat.toString().length > 5) return parseFloat(beforeDecimal + "." + afterDecimal).toPrecision(5)
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
            <div id="filters">
                <div className="filterDropdownBtn">
                    <button className={`filterBtn ${showEventMenu && "filterBtnActive"}`} onClick={toggleShowEventMenu}>event type</button>
                    <div className={`dropdownMenu ${showEventMenu && "showDropdownMenu"}`}>
                        <button
                            className={`${eventType[0].isActive ? "filterBtnIsActive" : ""}`}
                            onClick={() => dispatchEventType({ type: "created" })}
                        >
                            created
                        </button>
                        <button
                            className={`${eventType[1].isActive ? "filterBtnIsActive" : ""}`}
                            onClick={() => dispatchEventType({ type: "successful" })}
                        >
                            successful
                        </button>
                        <button
                            className={`${eventType[2].isActive ? "filterBtnIsActive" : ""}`}
                            onClick={() => dispatchEventType({ type: "cancelled" })}
                        >
                            cancelled
                        </button>
                        <button
                            className={`${eventType[3].isActive ? "filterBtnIsActive" : ""}`}
                            onClick={() => dispatchEventType({ type: "transfer" })}
                        >
                            transfer
                        </button>
                    </div>
                </div>
                <div className="filterDropdownBtn">
                    <button className="filterBtn">occurred before</button>
                    <div className="dropdownMenu">

                    </div>
                </div>

            </div>
            {/* __________ Container of all events ______________________________________________ */}
            <div id="eventsContainer">
                <div ref={topActivity}></div>
                {
                    activityData && activityData.map(event => (
                        <div className="event card" key={event.id}  >
                            {/* __________ create a div with a ref to scroll to after clicking next / prev btn _____*/}
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
                                {/* _______ NFT name  ______________________________________________________________ */}
                                <div>
                                    {
                                        event?.asset?.name ?
                                            (event.asset.name.length > 20 ? `${event.asset.name.slice(0, 20)}...` : event.asset.name)
                                            : event?.asset?.token_id ? (event?.asset?.token_id.length > 20 ? `#${event.asset.token_id.slice(0, 20)}...` : `#${event?.asset?.token_id}`)
                                            : event.asset_bundle.name && `${event.asset_bundle.name}`



                                    }
                                </div>
                                {/* _______ NFT collection name  ______________________________________________________________ */}
                                <div className="infoRows" id="collectionName">{event?.asset?.collection?.name}</div>
                                {/* _______ From wallet address  ______________________________________________________________ */}
                                <div className="infoRows">From: {
                                    event.event_type === "transfer" ?
                                        `${event?.transaction?.from_account?.address?.slice(0, 6)}...${event?.transaction?.from_account?.address?.slice(38)}`
                                        : `${event?.seller?.address.slice(0, 6)}...${event?.seller?.address.slice(38)}`
                                }
                                </div>
                                {/* _______ Price of the NFT  ______________________________________________________________ */}
                                <div className="infoRows" id="priceSection">
                                    <span>
                                        Price: {
                                            event.event_type === "successful" ?
                                                convertToPrice(event?.payment_token?.decimals, event.total_price)
                                                : event.event_type === "created" ?
                                                    convertToPrice(event?.payment_token?.decimals, event.starting_price)
                                                    : "---"

                                        }
                                    </span>
                                    {/* _______ Price symbol of the NFT  ______________________________________________________________ */}
                                    <img src={event.payment_token?.symbol === "WETH" ? WethIcon : EthIcon} alt="price symbol" id="priceSymbol" />
                                </div>
                                <div className="infoRows">
                                    To:
                                    {event.event_type === "successful" ?
                                        `${event.winner_account?.address.slice(0, 6)}...${event.winner_account?.address.slice(38)}`
                                        : event.event_type === "transfer" ?
                                            `${event?.transaction?.from_account?.address?.slice(0, 6)}...${event?.transaction?.from_account?.address?.slice(38)}`
                                            : event.event_type === "created" &&
                                            ` --- `
                                    }

                                </div>
                                {/* _______ Timestamp of when the NFT transaction happend  ___________________________________________ */}
                                <div className="infoRows"> {getTransactionTime(event.event_timestamp)} </div>
                                {/* _______ Link to the NFT on Opensea  ___________________________________________ */}
                                {
                                    event?.asset?.permalink ?
                                        <a href={event?.asset?.permalink} target="_blank" rel="noreferrer">
                                            <img src={OpenseaDark} alt="Opensea Link" className="openseaLink" />
                                        </a>
                                        : event?.asset_bundle?.permalink &&
                                        <a href={event?.asset_bundle?.permalink} target="_blank" rel="noreferrer">
                                            <img src={OpenseaDark} alt="Opensea Link" className="openseaLink" />
                                        </a>
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
