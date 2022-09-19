
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios"

export default function TotalMarket() {

    const [pieData, setPieData] = useState(false);

    const getTotalMarket = () => {
        axios.get("https://api.coingecko.com/api/v3/global")
            .then(res => setPieData(res.data.data))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getTotalMarket();
    }, [])


    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    const options = {
        plugins: {
            title: {
                display: true,
                font:{
                    family: "Quicksand",
                    size: 17.5
                },
                text: 'Total Crypto Marketcap (%)'
            },
            tooltip: {
                interaction: false,
                callbacks: {
                    label: function (context) {
                        return ` ${context.label} ${context.formattedValue} %`;
                    }
                }
            },
            legend: {
                // display: false,
                position: "left"
            }
        },
    }

    const data = {
        labels: pieData && Object?.keys(pieData?.market_cap_percentage),
        datasets: [
            {
                data: pieData && Object.values(pieData?.market_cap_percentage),
                backgroundColor: ["#4A719CDD", "#A5D4DFDD", "#333944DD", "#B3B6C7DD",],
                borderWidth: 2,
            }
        ]
    };

    return (
        <div className="totalMarketComponent">
            <div className="chart">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}
