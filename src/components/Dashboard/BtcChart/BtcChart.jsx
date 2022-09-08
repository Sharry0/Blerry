
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

    const [btcHistory, setBtcHistory] = useState();

    

    useEffect(() => {

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

    const options ={

    };

    const data = {
        // labels: pieData && Object?.keys(pieData?.market_cap_percentage),
        datasets: [
            {
                // data: pieData && Object.values(pieData?.market_cap_percentage),
                backgroundColor: ["#4A719CDD", "#A5D4DFDD", "#333944DD", "#B3B6C7DD",],
                borderWidth: 2,
            }
        ]
    };

    return (
        <div >
            <div className="chart">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}
