import "./dashboard.css"

import axios from "axios"
import { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function Dashboard() {

  const [top, setTop] = useState();
  const [timeRange, setTimeRange] = useState("month");
  const dataShown = 20;

  const get = async () => {
    await axios.get(`https://api.cryptoslam.io/v1/collections/top-100?timeRange=${timeRange}`)
      .then(res => {
        setTop(res.data)
      })
      .catch(err => console.log(err))
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  // _____ custom tooltip info function ____________________
  const footer = (tooltipItems) => {
    let sum = [];
    tooltipItems.forEach(function (tooltipItem) {
      const item = tooltipItem?.raw
      return sum = [
        `Sales:  ${item?.value.toLocaleString()} ${item.baseCurrency}`,
        `Transactions:  ${item?.transactions.toLocaleString()}`,
        `Buyers:  ${item?.buyers.toLocaleString()}`,
        `Sellers:  ${item?.sellers.toLocaleString()}`
      ]
    });
    return sum;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 0,
          boxHeight: 0
        },
      },
      tooltip: {
        backgroundColor: "rgba(51, 57, 68, 0.8)",
        bodyFont: {
          weight: "bold"
        },
        callbacks: {
          footer
        }
      },
      title: {
        display: true,
        text: `Top ${dataShown} NFT sales ${timeRange === "all" ? `overall` : `of the last ${timeRange}`}`,
      },
    },
    interaction: {
      intersect: false,
      mode: "index"
    },
    parsing: {
      xAxisKey: "contractName",
      yAxisKey: "valueUSD"
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Collections',
          color: '#012a4a',
          font: {
            family: 'Quicksand',
            size: 30,
            weight: 'normal',
            lineHeight: 1.2,
          },
          padding: { top: 5, left: 0, right: 0, bottom: 0 }
        },

      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'US Dollar ($)',
          color: '#013a63',
          font: {
            family: 'Quicksand',
            size: 30,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: { top: 0, left: 0, right: 0, bottom: 0 }
        },
        grid: {
          display: true,
          color: "#012a4a99"
        }
      }
    }
  };

  const data = {
    datasets: [
      {
        label: 'Sales USD',
        data: top?.filter((collection, i) => i < dataShown && collection),
        backgroundColor: ["#a9d6e5", "#89c2d9", "#61a5c2"],
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#014f86"
      },

    ],
  };
  // , "#468faf", "#2c7da0", "#2a6f97", "#014f86", "#01497c", "#013a63", "#012a4a", "#143642"

  const handleTimeBtnClick = (time) => {
    setTimeRange(time)
  }



  useEffect(() => {
    get();
  }, [timeRange]);

  return (
    <div className="dashboardComponent">
      <div className="chart">
        <div>
          <button
            className={`chartBtn ${timeRange === "day" && "activeBtn"}`}
            onClick={() => handleTimeBtnClick("day")}
          >
            Day
          </button>
          <button
            className={`chartBtn ${timeRange === "week" && "activeBtn"}`}
            onClick={() => handleTimeBtnClick("week")}
          >
            Week
          </button>
          <button
            className={`chartBtn ${timeRange === "month" && "activeBtn"}`}
            onClick={() => handleTimeBtnClick("month")}
          >
            Month
          </button>
          <button
            className={`chartBtn ${timeRange === "all" && "activeBtn"}`}
            onClick={() => handleTimeBtnClick("all")}
          >
            All
          </button>
        </div>

        <Bar options={options} data={data} />

      </div>


    </div>
  )
}

