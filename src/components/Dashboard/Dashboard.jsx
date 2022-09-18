
import "./dashboard.css";
import Coins from "./Coins/Coins";
import TotalMarket from "./TotalMarketPie/TotalMarket";
import TopTenList from "./TopTen/TopTenList";
import BtcChart from "./BtcChart/BtcChart";
import TrendingSearch from "./TrendingSearch/TrendingSearch";

export default function Dashboard() {

    return (
        <div className="dashboardComponent">
            <div className="topRowCharts">
                <TotalMarket />
                <BtcChart />
                <TrendingSearch />
            </div>
                <TopTenList />
        </div>
    )
}

