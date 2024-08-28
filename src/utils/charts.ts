import { ChartOptions } from 'chart.js';
import { TFunction } from "i18next";

import theme from "../config/Theme.tsx";

export type Dataset = {
    label: string;
    data: { x: string; y: number }[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
};

export function getLineChartInitData(label: string, t: TFunction<"translation", undefined>): { datasets: Dataset[] } {
    return {
        datasets: [
            {
                label: t(label),
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'red',
                tension: 0.4
            },
        ],
    };
}

export const lineChartOptions: ChartOptions<'line'> = {
    plugins: {
        legend: {
            labels: {
                color: theme.colors.text
            }
        },
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'hour',
                displayFormats: {
                    hour: 'HH:mm'
                }
            },
            ticks: {
                color: theme.colors.text
            },
            grid: {
                color: theme.colors.textLight
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: theme.colors.text
            },
            grid: {
                color: theme.colors.textLight
            },
        }
    }
};

export const lineChartStyle = {
    border: `solid 3px ${theme.colors.primary}`,
    borderRadius: '5px',
    backgroundColor: theme.colors.componentBackground,
    marginTop: '15px',
};