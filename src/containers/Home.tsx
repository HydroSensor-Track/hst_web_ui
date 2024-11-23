import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { HomeContainer } from "../styled-components/Home_2.0.tsx";
import { ChartsContainer, InfoContainer } from "../styled-components/Home_2.0.tsx";
import FilterPanel from "../components/FilterPanel.tsx";
import LineChart from '../components/LineChart.tsx';
import { SensorInfoComponent } from '../components/SensorInfo.tsx';
import { METRIC_TYPE, SensorList } from '../interfaces/sensorInfo.ts';
import Loading from '../components/Loading.tsx';

const Home = () => {

    
    const red = useSelector((state: RootState) => state.queryChart.red);
    const ubicacion = useSelector((state: RootState) => state.queryChart.ubicacion);
    const sensorsInfo = useSelector((state: RootState) => state.sensorsInfo.byLocation);
    const metricsLoading = useSelector((state: RootState) => state.sensorsMetrics.loading);

    const [currentSensorDetails, setCurrentSensorDetails] = useState<SensorList>([]) 

    useEffect(() => {
        setCurrentSensorDetails(sensorsInfo[red][ubicacion])
        console.log("Unicamente cambiaron red o ubicacion")
        console.log(red)
        console.log(ubicacion)
    }, [red, ubicacion, sensorsInfo])

    return (
        <HomeContainer>
            {/* Filters + Sensor container */}
            <InfoContainer>
                <FilterPanel/>
                <SensorInfoComponent sensors={currentSensorDetails ? currentSensorDetails : []}/>
            </InfoContainer>
            
            <ChartsContainer>
                <div>
                    {metricsLoading ? <Loading/> : <LineChart metricType={METRIC_TYPE.WATER_LEVEL} title='Nivel del agua'/>}
                </div>
                <div>
                    {metricsLoading ? <Loading/> : <LineChart metricType={METRIC_TYPE.BATTERY_LEVEL} title='Nivel de batería'/>}
                </div>
            </ChartsContainer>
        </HomeContainer>
    );
};

export default Home;
