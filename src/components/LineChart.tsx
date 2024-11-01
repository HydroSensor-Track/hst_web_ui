import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale, LineElement, PointElement } from 'chart.js';
import { useSelector } from "react-redux";
import theme from '../config/Theme';
import { RootState } from "../redux/store.ts";
import 'chartjs-adapter-date-fns';
import { QueryChart } from '../interfaces/queryChart';
ChartJS.register(TimeScale, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

type Props<T> = {
    query: QueryChart;
    dataType: T;
    title: string;
};

const LineChart = <T,>({ title }: Props<T>) => {

    // const sensorsByLocation = useSelector((state: RootState) => state.sensorsInfo.byLocation);
    // const locationQuery = useSelector((state: RootState) => state.queryChart.ubicacion);
    // const sensorQuery = useSelector((state: RootState) => state.queryChart.sensores);
    const timeUnit = useSelector((state: RootState) => state.queryChart.unidadTiempo);
    // const timeUpdate = useSelector((state: RootState) => state.queryChart.actualizacionTiempo);


    // Suponemos que obtienes los datos de la API basados en el `query`
    const fetchData = () => {

        return {
            labels: ['2023-09-01T00:00:00', '2023-09-02T14:35:12', '2023-09-03T09:10:03'],
            datasets: [
                {
                    label: 'Sensor 1',
                    data: [30, 50, 45],
                    borderColor: 'rgba(75,192,192,1)',
                    fill: false,
                },
                {
                    label: 'Sensor 2',
                    data: [40, 45, 60],
                    borderColor: 'rgba(153,102,255,1)',
                    fill: false,
                },
            ],
        };
    };

    const data = fetchData();

    return <Line
        data={data}
        options={{
            plugins: {
                title: {
                    display: true,
                    text: title,
                    color: theme.colors.text,
                    padding: {
                        top: 10,
                        bottom: 10
                    },

                    align: "start"
                },
                legend: {
                    labels: {
                        color: theme.colors.text,
                        usePointStyle: false,
                        boxWidth: 1,
                        padding: 15,
                    },
                }
            },
            borderColor: '#FFFFFF',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: timeUnit,
                        displayFormats: {
                            minute: 'HH:mm',
                            hour: 'HH:00',
                            day: 'DD Mon, YYYY'
                        }
                    },
                    ticks: {
                        color: theme.colors.text,
                        // TODO: Max ticks will depend on the amount of days
                        // maxTicksLimit: 10,
                        autoSkip: false, // No omite automáticamente los ticks
                        source: 'auto', // Fuente de los ticks basada en datos
                        stepSize: 1, // El espaciado básico de los ticks es 1, pero lo ajustaremos dinámicamente
                        callback: function (_value, index, values) {

                            const tick = values[index].value;
                            const tickDate = new Date(tick);

                            // Si la escala está en horas, espaciado de 1 hora
                            if (timeUnit == 'hour') {
                                return tickDate.getHours().toString().padStart(2, '0') + ":00";
                            }

                            // Si la escala está en minutos, espaciado de 15 minutos
                            if (timeUnit == 'minute' && tickDate.getMinutes() % 15 === 0) {
                                return tickDate.getHours().toString().padStart(2, '0') + ":" + tickDate.getMinutes().toString().padStart(2, '0');
                            }

                            // Si la escala está en días, espaciado de 1 día
                            if (timeUnit == 'day') {
                                return tickDate.toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                });
                            }

                            return null; // No muestra el resto de los ticks
                        }
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: theme.colors.text,

                    },
                },
            }
        }}
    />;
};

export default LineChart;
