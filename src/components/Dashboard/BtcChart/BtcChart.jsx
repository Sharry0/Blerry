
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from "axios"

export default function BtcChart() {

  const [btcHistory, setBtcHistory] = useState(false);
  // const [currency, setCurrency] = useState("usd");
  const currency = "usd";
  // const [days, setDays] = useState("3");
  const days = "3";
  const months = ["Jan", "Feb", "Mar", "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const getBtcHistory = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`)
      .then(res => setBtcHistory(res.data))
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getBtcHistory();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: days,
          maxRotation: 0,
          minRotation: 0,
          autoSkipPadding: 10,

        },
        grid: {
          drawOnChartArea: false
        },
      }
    },
    plugins: {
      title: {
        display: true,
        font: {
          family: "Quicksand",
          size: 17.5
        },
        text: `Bitcoin chart (${currency}) of the last ${days} days`
      },
      legend: {
        display: false,
      },
      tooltip: {
        interaction: false,
        callbacks: {
          label: function (context) {
            return ` ${context.formattedValue} ${currency}`;
          },
        }
      }
    },
  };
  // ________if you want to add the time to xAxis ticks_______
  // const checkLengthOfInt = (hour, min) => {
  //     if (hour || hour === 0) {
  //         if (hour.toString().length <= 1) return `0${hour}`
  //         return hour
  //     }
  //     if (min || min === 0) {
  //         if (min.toString().length <= 1) return `${min}0`
  //         return min
  //     }
  // }

  const unixTimeToDateTime = (unixTime) => {
    const s = new Date(unixTime);
    const month = s.getMonth();
    const day = s.getDate();
    // ________if you want to add the time to xAxis ticks_______
    // const hour = checkLengthOfInt(s.getHours()); 
    // const min = checkLengthOfInt(false, s.getMinutes());
    return `${day}. ${months[month]}`
    // return `${day}. ${months[month]} ${hour}:${min}`
  };

  const data = {
    labels: btcHistory && btcHistory.prices.map(unix => unixTimeToDateTime(unix[0])),
    datasets: [
      {
        data: btcHistory && btcHistory.prices.map(unix => unix[1]),
        borderColor: "#4A719CAA",
        borderWidth: 4,
        pointRadius: 1.5,
        pointHitRadius: 10,
      }
    ]
  };

  return (
    <div className="btcHistoryComponent chart">
      <Line options={options} data={data} />
    </div>
  )
}
