
import { NavLink } from "react-router-dom";
import Settings from "./Settings/Settings";

import "./navbar.css";
// _____ Images & Icons __________________________________________
import blerryLogo from "../../images/blerry_logo.svg";
import dashboardIcon from "../../images/icons/dashboard_icon.svg";
import walletIcon from "../../images/icons/wallet_icon.svg";
import rankingsIcon from "../../images/icons/rankings_icon.svg";
import activityIcon from "../../images/icons/activity_icon.svg";
import marketIcon from "../../images/icons/market_icon.svg"
// import settingsIcon from "../../images/icons/settings_icon.svg";

export default function Navbar() {

    return (
        <div id="navComponent">
            <div id="navbarSide">
                {/* ______ upper half buttons on the navbar ________________________ */}
                <nav id="navbarMainTabs">
                    <NavLink
                    to="/"
                    className={({isActive})=> isActive ? `navbarBtn activeNavbarBtn`: `navbarBtn`} 
                    >
                        <img src={dashboardIcon} alt="dashboard icon" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                    to="/wallet"
                    className={({isActive})=> isActive ? `navbarBtn activeNavbarBtn`: `navbarBtn`} 
                    >
                        <img src={walletIcon} alt="wallet icon" />
                        <span>My Wallet</span>
                    </NavLink>
                    <NavLink
                    to="/bundles"
                    className={({isActive})=> isActive ? `navbarBtn activeNavbarBtn`: `navbarBtn`} 
                    >
                        <img src={rankingsIcon} alt="rankings icon" />
                        <span>Bundles</span>
                    </NavLink>
                    <NavLink
                    to="/activity"
                    className={({isActive})=> isActive ? `navbarBtn activeNavbarBtn`: `navbarBtn`} 
                    >
                        <img src={activityIcon} alt="activity icon" />
                        <span>Activity</span>
                    </NavLink>
                    <NavLink 
                    to="/market"
                    className={({isActive})=> isActive ? `navbarBtn activeNavbarBtn disable`: `navbarBtn disable`} 
                    >
                        <img src={marketIcon} id="disable" alt="market Icon" />
                        <span className="marketBtn">Market<br /><span className="marketSoon">coming soon</span></span>
                    </NavLink>
                </nav>
                {/* ______ lower half buttons & logo on the navbar ________________________ */}
                <div id="navbarFooter">
                    <div>
                        <img src={blerryLogo} alt="blerry logo" id="blerryLogo" />
                    </div>
                    <Settings />
                    {/* <button className="navbarBtn">
                        <img src={settingsIcon} alt="settings icon" />
                        <span>Settings</span>
                    </button> */}
                </div>
            </div>
        </div>
    )
}
