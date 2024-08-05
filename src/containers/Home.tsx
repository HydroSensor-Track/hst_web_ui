import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { HomeButton, HomeContainer, HomeText } from "../styled-components/Home.tsx";
import { RootState, AppDispatch } from "../redux/store.ts";
import { sensorLatestInfo, sensorsLocation } from "../redux/reducers/sensorSlice.ts";

const Home = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticatedState = useSelector((state: RootState) => state.auth.isAuthenticated);
    const { sensors, locations } = useSelector((state: RootState) => state.sensor);

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
        </HomeContainer>
    );
};

export default Home;