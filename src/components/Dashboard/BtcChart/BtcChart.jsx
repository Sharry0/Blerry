
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
    const [currency, setCurrency] = useState("usd");
    const [days, setDays] = useState("3");
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
        Legend
    );

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Bitcoin (${currency})`
            },
            tooltip: {
                interaction: false,
                callbacks: {
                    label: function (context) {
                        // console.log(context)
                        return ` ${context.formattedValue} ${currency}`;
                    },
                }
            }
        },
    };

    const unixTimeToDateTime = (unixTime) => {
        const s = new Date(unixTime)
        const month = s.getMonth()
        const day = s.getDate()
        return `${day}. ${months[month]}`
    };

    const data = {
        labels: btcHistory && btcHistory.prices.map(unix => unixTimeToDateTime(unix[0])),
        datasets: [
            {
                data: btcHistory && btcHistory.prices.map(unix => unix[1]),
                backgroundColor: "#4A719CDD",
                borderWidth: 2,
            }
        ]
    };

    return (
        <div className="btcHistoryComponent">
            <div className="chart">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}
