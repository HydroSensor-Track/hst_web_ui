import { useTranslation } from "react-i18next";
import {
    LocationContainer,
    LocationTitle,
    LocationInfo,
    LocationLabel,
    LocationValue,
    LocationBattery,
    SensorInfoContainer
} from "../styled-components/Sensor.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { SensorDeltaInfo, SensorList } from "../interfaces/sensorInfo.ts";


const SensorDeltaDetails: React.FC<{sensor: SensorDeltaInfo}> = ({sensor}) => {
    const { t } = useTranslation();
    return (
        <LocationContainer>
            <LocationTitle>{sensor.name}</LocationTitle>
            <LocationInfo>
                <LocationLabel>ID:</LocationLabel>
                <LocationValue>{sensor.id}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('brand')}:</LocationLabel>
                <LocationValue>{sensor.marca}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('model')}:</LocationLabel>
                <LocationValue>{sensor.modelo}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Serie:</LocationLabel>
                <LocationValue>{sensor.serie}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('level')}:</LocationLabel>
                <LocationValue>{sensor.nivel}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('battery')}:</LocationLabel>
                <LocationBattery>{sensor.bateria / 10}%</LocationBattery>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('signal')}:</LocationLabel>
                <LocationValue>{sensor.senal}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('hour')}:</LocationLabel>
                <LocationValue>{sensor.hora}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('latitude')}:</LocationLabel>
                <LocationValue>{sensor.latitud}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('longitude')}:</LocationLabel>
                <LocationValue>{sensor.longitud}</LocationValue>
            </LocationInfo>
        </LocationContainer>
    );
}


export const SensorInfoComponent: React.FC<{sensors: SensorList}> = ({sensors}) => {


    const red = useSelector((state: RootState) => state.queryChart.red);

    return (
        <SensorInfoContainer>
        {sensors.map((sensor) => {
            if (red === "delta-parana") {
                return <SensorDeltaDetails sensor={sensor as SensorDeltaInfo}/>
            } else {
                <p>Network not supported</p>
            }
        })}
        </SensorInfoContainer>
  );
};