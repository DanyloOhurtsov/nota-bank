"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ accounts }: DoughnutChartProps) => {
    const accountsName = accounts.map((account: any) => account.name);
    const balances = accounts.map((account: any) => account.currentBalance);

    const data = {
        datasets: [
            {
                label: "Banks",
                data: balances,
                backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
            },
        ],
        labels: accountsName,
    };

    return (
        <Doughnut
            data={data}
            options={{
                cutout: "60%",
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
};

export default DonutChart;
