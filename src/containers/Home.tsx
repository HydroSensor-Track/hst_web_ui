import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { HomeButton, HomeContainer, HomeText, FilterContainer, FilterTitle, LabelSelectContainer, Label, Select } from "../styled-components/Home.tsx";
import { RootState, AppDispatch } from "../redux/store.ts";
import { sensorLatestInfo, sensorsLocation } from "../redux/reducers/sensorSlice.ts";
import { SensorInfoComponent } from "../components/SensorInfo.tsx";

const Home = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticatedState = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { sensors, locations } = useSelector((state: RootState) => state.sensor);
    const [filter, setFilter] = useState('Atucha II');

    const filteredLocations = sensors.filter((sensor) => {
        return sensor.name.toLowerCase() === (filter.toLowerCase());
    });

    useEffect(() => {
        dispatch(sensorsLocation());
    }, []);

    useEffect(() => {
        if (locations) {
            for (let i = 0; i < locations.length; i++) {
                dispatch(sensorLatestInfo(locations[i]));
            }
        }
    }, [locations]);

    return (
        <HomeContainer>
            <HomeText>{t('homeTitle')}</HomeText>
            <HomeButton onClick={() => isAuthenticatedState ? console.log('Yes', sensors.length) : console.log('No', sensors.length)}>Am I logged in ?</HomeButton>
            <FilterContainer>
                <FilterTitle>Filtros</FilterTitle>
                <LabelSelectContainer>
                    <Label htmlFor="filter">Ubicación:</Label>
                    <Select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        {sensors.map((sensor) => (
                            <option key={sensor.name} value={sensor.name}>
                                {sensor.name}
                            </option>
                        ))}
                    </Select>
                </LabelSelectContainer>
            </FilterContainer>
            {filteredLocations.map((sensor) => (
                <SensorInfoComponent {...sensor} />
            ))}
        </HomeContainer>
    );
};

export default Home;