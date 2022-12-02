
import "./dashboard.css";
import TotalMarket from "./TotalMarketPie/TotalMarket";
import TopTenList from "./TopTen/TopTenList";
import BtcChart from "./BtcChart/BtcChart";
import TrendingSearch from "./TrendingSearch/TrendingSearch";

export default function Dashboard() {

  return (
    <div className="dashboardComponent">

      <TopTenList />
      <BtcChart />
      <div className="bottomRowCharts" >
        <TrendingSearch />
        <TotalMarket />
      </div>
    </div>
  )
}

