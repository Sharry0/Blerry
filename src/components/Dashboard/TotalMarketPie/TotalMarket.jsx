
import css from "./TotalMarket.module.css"
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios"

export default function TotalMarket() {

    const [pieData, setPieData] = useState(false);

    const getTotalMarket = () => {
        axios.get("https://api.coingecko.com/api/v3/global")
            .then(res => setPieData(res.data.data))
            // .then(res => console.log(res.data.data))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getTotalMarket();
    }, [])

    // console.log(pieData)
    // console.log(pieData && Object?.keys(pieData?.market_cap_percentage))
    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Total Crypto Marketcap (%)'
            },
            tooltip:{
                interaction: false,
                callbacks: {
                    label: function(context) {
                        return ` ${context.label} ${context.formattedValue} %`;
                    }
                }
            }
        },

    }

    const data = {
        labels: pieData && Object?.keys(pieData?.market_cap_percentage),
        datasets: [
            {
                // label: '# of Votes',
                data: pieData && Object.values(pieData?.market_cap_percentage),
                // data: [...pieData.market_cap_percentage],
                backgroundColor: ["#4A719CDD", "#A5D4DFDD", "#333944DD", "#B3B6C7DD",],
                // borderColor: ["#4A719C", "#A5D4DF", "#333944", "#B3B6C7",],
                borderWidth: 2,
            }
        ]
    };


    return (
        <div  >
            <div className={css.chart}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}
