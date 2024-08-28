import { useTranslation } from "react-i18next";

import { SensorInfo } from '../interfaces/sensorInfo';
import {
    LocationContainer,
    LocationTitle,
    LocationInfo,
    LocationLabel,
    LocationValue,
    LocationBattery
} from "../styled-components/Sensor.tsx";

export const SensorInfoComponent: React.FC<SensorInfo> = ({
    id,
    marca,
    modelo,
    serie,
    nivel,
    bateria,
    senal,
    hora,
    latitud,
    longitud,
    name,
}) => {
    const { t } = useTranslation();
    return (
        <LocationContainer>
            <LocationTitle>{name}</LocationTitle>
            <LocationInfo>
                <LocationLabel>ID:</LocationLabel>
                <LocationValue>{id}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('brand')}:</LocationLabel>
                <LocationValue>{marca}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('model')}:</LocationLabel>
                <LocationValue>{modelo}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Serie:</LocationLabel>
                <LocationValue>{serie}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('level')}:</LocationLabel>
                <LocationValue>{nivel}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('battery')}:</LocationLabel>
                <LocationBattery>{bateria / 10}%</LocationBattery>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('signal')}:</LocationLabel>
                <LocationValue>{senal}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('hour')}:</LocationLabel>
                <LocationValue>{hora}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('latitude')}:</LocationLabel>
                <LocationValue>{latitud}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('longitude')}:</LocationLabel>
                <LocationValue>{longitud}</LocationValue>
            </LocationInfo>
        </LocationContainer>
    );
};