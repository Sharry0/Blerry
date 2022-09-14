
import "./dashboard.css";
import Coins from "./Coins/Coins";
import TotalMarket from "./TotalMarketPie/TotalMarket";
import BtcChart from "./BtcChart/BtcChart";

export default function Dashboard() {

    return (
        <div className="dashboardComponent">
            <div>
                <TotalMarket />
            </div>
                <BtcChart />
        </div>
    )
}

