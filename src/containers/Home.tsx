import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { HomeContainer } from "../styled-components/Home_2.0.tsx";
import { ChartsContainer, InfoContainer } from "../styled-components/Home_2.0.tsx";
import FilterPanel from "../components/FilterPanel.tsx";
import LineChart from '../components/LineChart.tsx';
import { SensorInfoComponent } from '../components/SensorInfo.tsx';
import { SensorList } from '../interfaces/sensorInfo.ts';


const Home = () => {
    
    const query = useSelector((state: RootState) => state.queryChart);
    const sensorsInfo = useSelector((state: RootState) => state.sensorsInfo.byLocation);

    const [currentSensorDetails, setCurrentSensorDetails] = useState<SensorList>([]) 

    useEffect(() => {
        setCurrentSensorDetails(sensorsInfo[query.red][query.ubicacion])
    }, [query, sensorsInfo])
    

    return (
        <HomeContainer>
            {/* Filters + Sensor container */}
            <InfoContainer>
                <FilterPanel/>
                <SensorInfoComponent sensors={currentSensorDetails ? currentSensorDetails : []}/>
            </InfoContainer>
            
            <ChartsContainer>
                <div>
                    <LineChart query={query} dataType="sensor" title="Medición de sensores - m"/>
                </div>
                <div>
                    <LineChart query={query} dataType="bateria" title="Evolución de la batería - %"/>
                </div>
            </ChartsContainer>
        </HomeContainer>
    );
};

export default Home;
