
import { useState } from "react";

import "./styles/navbar.css";
// _____ Images & Icons __________________________________________
import blerryLogo from "../images/blerry_logo.svg";
import dashboardIcon from "../images/icons/dashboard_icon.svg";
import walletIcon from "../images/icons/wallet_icon.svg";
import rankingsIcon from "../images/icons/rankings_icon.svg";
import activityIcon from "../images/icons/activity_icon.svg";
import marketIcon from "../images/icons/market_icon.svg"
import settingsIcon from "../images/icons/settings_icon.svg"

export default function Navbar() {

    const [dashboardIsActive, setDashboardActive] = useState(true);
    const [walletIsActive, setWalletActive] = useState(false);
    const [rankingsIsActive, setRankingsActive] = useState(false);
    const [activityIsActive, setActivityActive] = useState(false);
    const [marketIsActive, setMarketActive] = useState(false);

    const handleNavBtnClick = (btnName) => {
        const setOtherStatsFalse = (funcOne, funcTwo, funcThree, funcFour) => {
            funcOne(false);
            funcTwo(false);
            funcThree(false);
            funcFour(false);
        }
        switch (btnName) {
            case "dashboard":
                setDashboardActive(true);
                setOtherStatsFalse(setWalletActive, setRankingsActive, setActivityActive, setMarketActive);
                break;
            case "wallet":
                setWalletActive(true);
                setOtherStatsFalse(setDashboardActive, setRankingsActive, setActivityActive, setMarketActive);
                break;
            case "rankings":
                setRankingsActive(true);
                setOtherStatsFalse(setDashboardActive, setWalletActive, setActivityActive, setMarketActive);
                break;
            case "activity":
                setActivityActive(true);
                setOtherStatsFalse(setDashboardActive, setWalletActive, setRankingsActive, setMarketActive);
                break;
            case "market":
                setMarketActive(true);
                setOtherStatsFalse(setDashboardActive, setWalletActive, setRankingsActive, setActivityActive);
                break;
            default:
                break;
        }
    }

    return (
        <div id="navComponent">
            <div id="navbarSide">
                {/* ______ upper half buttons on the navbar ________________________ */}
                <div id="navbarMainTabs">
                    <button className={`navbarBtn ${dashboardIsActive ? "activeNavbarBtn" : ""}`} onClick={() => handleNavBtnClick("dashboard")} >
                        <img src={dashboardIcon} alt="dashboard icon" />
                        <span>Dashboard</span>
                    </button>
                    <button className={`navbarBtn ${walletIsActive ? "activeNavbarBtn" : ""}`} onClick={() => handleNavBtnClick("wallet")} >
                        <img src={walletIcon} alt="wallet icon" />
                        <span>My Wallet</span>
                    </button>
                    <button className={`navbarBtn ${rankingsIsActive ? "activeNavbarBtn" : ""}`} onClick={() => handleNavBtnClick("rankings")} >
                        <img src={rankingsIcon} alt="rankings icon" />
                        <span>Rankings</span>
                    </button>
                    <button className={`navbarBtn ${activityIsActive ? "activeNavbarBtn" : ""}`} onClick={() => handleNavBtnClick("activity")} >
                        <img src={activityIcon} alt="activity icon" />
                        <span>Activity</span>
                    </button>
                    <button className={`navbarBtn  ${marketIsActive ? "activeNavbarBtn" : ""}`} disabled onClick={() => handleNavBtnClick("market")} >
                        <img src={marketIcon} alt="market Icon" />
                        <span>Market</span>
                    </button>
                </div>
                {/* ______ lower half buttons & logo on the navbar ________________________ */}
                <div id="navbarFooter">
                    <div>
                        <img src={blerryLogo} alt="blerry logo" id="blerryLogo" />
                    </div>
                    <button className="navbarBtn">
                        <img src={settingsIcon} alt="settings icon" />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
