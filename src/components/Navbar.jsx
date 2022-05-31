
import "./styles/navbar.css";
import blerryLogo from "../images/blerry_logo.svg";
import dashboardIcon from "../images/icons/dashboard_icon.svg";
import walletIcon from "../images/icons/wallet_icon.svg";
import rankingsIcon from "../images/icons/rankings_icon.svg";
import activityIcon from "../images/icons/activity_icon.svg";
import marketIcon from "../images/icons/market_icon.svg"
import settingsIcon from "../images/icons/settings_icon.svg"

export default function Navbar() {
    return (
        <div id="navComponent">
            <div id="navbarSide">
                <div id="navbarMainTabs">
                    <button className="navbarBtn">
                        <img src={dashboardIcon} alt="dashboard icon" />
                        <span>Dashboard</span>
                    </button>
                    <button className="navbarBtn">
                        <img src={walletIcon} alt="wallet icon" />
                        <span>My Wallet</span>
                    </button>
                    <button className="navbarBtn">
                        <img src={rankingsIcon} alt="rankings icon" />
                        <span>Rankings</span>
                    </button>
                    <button className="navbarBtn">
                        <img src={activityIcon} alt="activity icon" />
                        <span>Activity</span>
                    </button>
                    <button className="navbarBtn">
                        <img src={marketIcon} alt="market Icon" />
                        <span>Market</span>
                    </button>
                </div>
                <div id="navFooter">
                    <button className="navbarBtn">
                        <img src={settingsIcon} alt="settings icon" />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
