
import "./dashboard.css";
import Coins from "./Coins/Coins";
import TotalMarket from "./TotalMarketPie/TotalMarket";
import TopTenList from "./TopTen/TopTenList";
import BtcChart from "./BtcChart/BtcChart";

export default function Dashboard() {

    return (
        <div className="dashboardComponent">
            <div className="topRowCharts">
                <TotalMarket />
                <TopTenList />
            </div>
                <BtcChart />
        </div>
    )
}

