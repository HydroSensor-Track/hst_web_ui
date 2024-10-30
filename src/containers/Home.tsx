import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { TFunction } from "i18next";

import {
    Chart as ChartJS,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

//TODO: may be we need to change some imports from Home.tsx; check if it's necessary a refactor.
import {
    HomeContainer,
    FilterContainer,
    FilterTitle, LabelSelectContainer,
    Label,
    Select,
    ContentContainer,
    ChartsContainer
} from "../styled-components/Home.tsx";
import { RootState, AppDispatch } from "../redux/store.ts";
import { sensorLatestInfo, sensorsLocation } from "../redux/reducers/sensorSlice.ts";
import { getSensorSignalMetrics, getSensorLevelMetrics } from "../redux/reducers/sensorTimeSlice.ts"
import { SensorInfoComponent } from "../components/SensorInfo.tsx";
import { isBatteryMetric, isLevelMetric, isSignalMetric, SensorsTimeInfo } from "../interfaces/sensorTimeMetrics.ts";
import { Dataset, getLineChartInitData, lineChartOptions, lineChartStyle } from "../utils/charts.ts";
import { SensorInfo } from "../interfaces/sensorInfo.ts";

function getDataToTimeLineChart(
    dataSensorTimeInfo: SensorsTimeInfo,
    sensorToFilfer: string,
    idToFilter: string,
    label: string,
    t: TFunction<"translation", undefined>) {

    const filteredSensorTimeMetrics = dataSensorTimeInfo[sensorToFilfer];

    const dataForTimeLineChart = filteredSensorTimeMetrics[idToFilter].map((data) => {
        var dia_hora_split = data.hora.split("T");
        var horas = dia_hora_split[1].split(":");
        var segundos = horas[2].split(".");

        var metricValue = 0;
        if (isBatteryMetric(data)) {
            metricValue = data.bateria / 10;
        } if (isLevelMetric(data)) {
            metricValue = data.nivel;
        } if (isSignalMetric(data)) {
            metricValue = data.senal;
        }

        return {
            x: `${dia_hora_split[0]} ${horas[0]}:${horas[1]}:${segundos[0]}`,
            y: metricValue
        };
    });

    const dataMetricTimeInfo = {
        datasets: [
            {
                label: t(`${label}`),
                data: dataForTimeLineChart,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'red',
                tension: 0.4
            },
        ],
    };

    return dataMetricTimeInfo;
}

function getTimestampsForToday(hour: number, minute: number, second: number, milisecond: number) {
    const date = new Date();
    date.setHours(hour, minute, second, milisecond);
    return Math.floor(date.getTime() / 1000);
}

const Home = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticatedState = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { sensors, locations } = useSelector((state: RootState) => state.sensor);
    const { signalData, levelData } = useSelector((state: RootState) => state.sensorTime);
    //TODO: Delete default value
    const [filter, setFilter] = useState('');
    /*
    I added the auxFilter due to some locations don't have information for today, so
    when we choose a location that doesn't have information for today, we don't have
    the level and signal data to show in the charts (this brokes the app). So, we need
    to filter the locations that have information for today.
    TODO: Don't forget to tell this detail to the user.
    */
    const [auxFilter, setAuxFilter] = useState('');
    const [idToFilter, setIdToFilter] = useState('');

    const [sensorInfo, setSensorInfo] = useState<SensorInfo[]>([{
        id: '',
        marca: '',
        modelo: '',
        serie: '',
        nivel: 0,
        bateria: 0,
        senal: 0,
        hora: '',
        latitud: 0,
        longitud: 0,
        name: ''
    }]);

    const [dataSignal, setDataSignal] = useState<{ datasets: Dataset[] }>(getLineChartInitData('signal', t));
    const [dataLevel, setDataLevel] = useState<{ datasets: Dataset[] }>(getLineChartInitData('level', t));

    const timestamp_start = getTimestampsForToday(0, 0, 0, 0);//1724122800;

    const timestamp_end = getTimestampsForToday(23, 59, 59, 999);//1724209199;

    const filteredLocation = Object.keys(signalData).filter((location) => {
        return location.toLowerCase() === (filter.toLowerCase());
    });

    const filteredLocations = sensors.filter((sensor) => {
        return sensor.name.toLowerCase() === (auxFilter.toLowerCase());
    });

    useEffect(() => {
        dispatch(sensorsLocation());
    }, []);

    useEffect(() => {
        if (locations) {
            locations.forEach((location) => {
                dispatch(sensorLatestInfo(location));
                dispatch(getSensorSignalMetrics({
                    sensorName: location,
                    from: timestamp_start,
                    to: timestamp_end
                }));
                dispatch(getSensorLevelMetrics({
                    sensorName: location,
                    from: timestamp_start,
                    to: timestamp_end
                }));
            });
        }
    }, [locations]);

    useEffect(() => {
        if (idToFilter) {
            const signalDataMetric = getDataToTimeLineChart(
                signalData,
                filter,
                idToFilter,
                'signal',
                t
            );

            const levelDataMetric = getDataToTimeLineChart(
                levelData,
                filter,
                idToFilter,
                'level',
                t
            );

            const filteredSensorInfo = filteredLocations.filter((sensor) => {
                return parseFloat(sensor.id) === parseFloat(idToFilter);
            });

            setDataSignal(signalDataMetric);
            setDataLevel(levelDataMetric);
            setSensorInfo(filteredSensorInfo);
        }
    }, [idToFilter]);

    useEffect(() => {
        if (filteredLocation.length > 0) {
            console.log("filteredLocation", filteredLocation);
            setAuxFilter(filteredLocation[0]);
        }
    }, [filter]);

    return (
        <HomeContainer>
            <ContentContainer>
                <FilterContainer>
                    <FilterTitle>{t('filters')}</FilterTitle>
                    <LabelSelectContainer>
                        <Label htmlFor="filter">{t('location')}:</Label>
                        <Select
                            id="filterByName"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            {Object.keys(signalData).map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </Select>
                    </LabelSelectContainer>
                    <LabelSelectContainer>
                        <Label htmlFor="filterById">{t('sensorId')}:</Label>
                        <Select
                            id="filterById"
                            value={idToFilter}
                            onChange={(e) => {
                                setIdToFilter(e.target.value);
                                console.log("onChange in filterById", e);
                            }}
                        >
                            {[
                                { id: '-1' },
                                ...filteredLocations,
                            ].map((sensor) => (
                                <option key={sensor.id} value={sensor.id}>
                                    {sensor.id}
                                </option>
                            ))}
                        </Select>
                    </LabelSelectContainer>
                </FilterContainer>
                {sensorInfo.map(sensorInfo => {
                    return (
                        <SensorInfoComponent
                            id={sensorInfo.id}
                            marca={sensorInfo.marca}
                            modelo={sensorInfo.modelo}
                            serie={sensorInfo.serie}
                            nivel={sensorInfo.nivel}
                            bateria={sensorInfo.bateria}
                            senal={sensorInfo.senal}
                            hora={sensorInfo.hora}
                            latitud={sensorInfo.latitud}
                            longitud={sensorInfo.longitud}
                            name={sensorInfo.name}
                        />
                    );
                })}
            </ContentContainer>
            <ChartsContainer>
                <Line data={dataSignal} options={lineChartOptions} style={lineChartStyle} />
                <Line data={dataLevel} options={lineChartOptions} style={lineChartStyle} />
            </ChartsContainer>
        </HomeContainer>
    );
};

export default Home;
