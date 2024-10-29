import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { HomeContainer } from "../styled-components/Home_2.0";
import { ChartsContainer, InfoContainer } from "../styled-components/Home_2.0";
import FilterPanel from "../components/FilterPanel";
import LineChart from '../components/LineChart';
import { fetchSensorsInfo } from '../redux/reducers/sensorInfoSlice.ts';
import { SensorInfoComponent } from '../components/SensorInfo.tsx';
import { SensorList } from '../interfaces/sensorInfo.ts';


const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector((state: RootState) => state.queryChart);
    const sensorsInfo = useSelector((state: RootState) => state.sensorsInfo.byLocation);
    const loadingSensors = useSelector((state: RootState) => state.sensorsInfo.loading);

    const [currentSensorDetails, setCurrentSensorDetails] = useState<SensorList>([]) 

    useEffect(() => {
        setCurrentSensorDetails(sensorsInfo[query.red][query.ubicacion])
    }, [query, sensorsInfo])
    
    // TODO: Que no se haga la request cada vez que se renderiza si no unicamente la primera vez y cuando apretamos un boton de refresh
    useEffect(() => {

        dispatch(fetchSensorsInfo())

    }, [dispatch]);

    return (
        <HomeContainer>
            {/* Filters + Sensor container */}
            {loadingSensors ? 
            <p>Loading...</p> :
            <>
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
            </>
            }
        </HomeContainer>
    );
};

export default Home;
