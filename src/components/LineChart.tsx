import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale, LineElement, PointElement } from 'chart.js';
import { useSelector } from "react-redux";
import theme from '../config/Theme';
import { RootState } from "../redux/store.ts";
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from 'react';
import { METRIC_TYPE } from '../interfaces/sensorInfo.ts';
import { filterWaterData, filterBatteryData } from '../utils/queryUtils.ts';
ChartJS.register(TimeScale, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

type Props = {
    title: string;
    metricType: METRIC_TYPE;
};

interface Dataset {
    label: string;
    data: (number | null)[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

const LineChart = ({metricType, title}: Props) => {

    const timeUnit = useSelector((state: RootState) => state.queryChart.unidadTiempo);
    const [labels, setLabels] = useState([""])
    const [datasets, setDatasets] = useState<Dataset[]>([])
    const query = useSelector((state: RootState) => state.queryChart);
    const waterLevelData = useSelector((state: RootState) => state.sensorsMetrics.waterLevelData);
    const batteryLevelData = useSelector((state: RootState) => state.sensorsMetrics.batteryLevelData);

    const [noData, setNoData] = useState(false)

    useEffect(() => {
        let response = null;

        // Selecciona datos y función de filtrado según el tipo de métrica
        if (metricType === METRIC_TYPE.WATER_LEVEL && Object.keys(waterLevelData).length > 0) {
            response = filterWaterData(waterLevelData, query);
        } else if (metricType === METRIC_TYPE.BATTERY_LEVEL && Object.keys(batteryLevelData).length > 0) {
            response = filterBatteryData(batteryLevelData, query);
        }


        if (response) {
            setNoData(false)
            setLabels(response.labels);
            setDatasets(response.datasets);
        } else {
            console.log("No hay datos disponibles para los filtros seleccionados");
            setNoData(true)
        }

    }, [waterLevelData, batteryLevelData, query, metricType]); // Añade las dependencias necesarias


    return <>
        {
            noData ?
            <div style={{display:"flex", justifyContent: "center" ,height: "100%"}}>
                <p>No hay datos disponibles para los filtros seleccionados</p> 
            </div> :
            <Line
        data={{
            labels:labels,
            datasets:datasets
        }}
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
                        callback: function(value, index, values) {
                          
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
    />}
    </>
    
    
};

export default LineChart;
