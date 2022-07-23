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
  const [timeRange, setTimeRange] = useState("week")
  const dataShown = 10

  const get = async () => {
    await axios.get(`https://api.cryptoslam.io/v1/collections/top-100?timeRange=${timeRange}`)
      .then(res => {
        setTop(res.data)
      })
      .catch(err => console.log(err))
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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
        backgroundColor: "rgba(51, 57, 68, 0.8)"
      },
      title: {
        display: true,
        text: `Top ${dataShown} NFT sales of the last ${timeRange}`,
      },
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
    // labels: top?.filter((collection, i) => i< dataShown &&  collection).map(collection=> collection.contractName),
    datasets: [
      {
        label: 'Sales USD',
        data: top?.filter((collection, i) => i < dataShown && collection),
        // data: top?.filter((collection, i) =>  i<= dataShown && collection)?.map(collection=> collection.valueUSD),
        backgroundColor: ["#a9d6e5", "#89c2d9", "#61a5c2"]
      },

    ],
  };
  // , "#468faf", "#2c7da0", "#2a6f97", "#014f86", "#01497c", "#013a63", "#012a4a", "#143642"

  useEffect(() => {
    get();
  }, [])

  return (
    <div className="dashboardComponent">

      <div className="chart">
        <div className="topSalesBtns">
          <button></button>
        </div>

        <Bar options={options} data={data} />

      </div>


    </div>
  )
}

