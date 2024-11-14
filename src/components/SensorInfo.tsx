import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
    LocationContainer,
    LocationTitle,
    LocationInfo,
    LocationLabel,
    LocationValue,
    LocationBattery,
    SensorInfoContainer,
    SensorDetailsHeader,
    Arrow
} from "../styled-components/Sensor.tsx";
import { SensorDeltaInfo, SensorPrevenirInfo, SensorList } from "../interfaces/sensorInfo.ts";
import Icon from "./Icon.tsx";

function isSensorDeltaInfo(sensor: SensorDeltaInfo | SensorPrevenirInfo): sensor is SensorDeltaInfo {
    return (sensor as SensorDeltaInfo).marca !== undefined;
}

const SensorDeltaDetails: React.FC<{sensor: SensorDeltaInfo}> = ({sensor}) => {
    
    const { t } = useTranslation();
    return (
        <>
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
                <LocationLabel>{t('latitude')}:</LocationLabel>
                <LocationValue>{sensor.latitud}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>{t('longitude')}:</LocationLabel>
                <LocationValue>{sensor.longitud}</LocationValue>
            </LocationInfo>
        </>
    )
}

const SensorDetails: React.FC<{sensor: SensorDeltaInfo | SensorPrevenirInfo}> = ({sensor}) => {

    useEffect(() => {

    }, [])

    return (
        <LocationContainer>
            <LocationTitle>{sensor.name}</LocationTitle>
            <LocationInfo>
                <LocationLabel>ID:</LocationLabel>
                <LocationValue>{sensor.id}</LocationValue>
            </LocationInfo>
            {isSensorDeltaInfo(sensor) &&
                <SensorDeltaDetails sensor={sensor}/>
            }
            
        </LocationContainer>
    );
}


export const SensorInfoComponent: React.FC<{sensors: SensorList}> = ({sensors}) => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [disableRightArrow, setDisableRightArrow] = useState(true);
    const [disableLeftArrow, setDisableLeftArrow] = useState(true);


    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === (sensors.length - 1) ? (sensors.length - 1) : (prevIndex + 1) % sensors.length);
    };


    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? 0 : prevIndex - 1
        );
    };

    useEffect(() => {
        if (currentIndex <= 0) {
            setDisableLeftArrow(true);
        } else {
            setDisableLeftArrow(false);
        }
    
        if (currentIndex >= sensors.length - 1) {
            
            setDisableRightArrow(true);
        } else {
            setDisableRightArrow(false);
        }
      }, [currentIndex, sensors.length]);


    return (
        <SensorInfoContainer>
            {sensors.length > 0 &&
                <>
                <SensorDetailsHeader>
                    
                    <Arrow onClick={handlePrev} disabled={disableLeftArrow}>
                        <Icon name="leftArrow" />
                    </Arrow>
                    <Arrow onClick={handleNext} disabled={disableRightArrow}>
                        <Icon name="rightArrow" />
                    </Arrow>
                </SensorDetailsHeader>
                
                <SensorDetails sensor={sensors[currentIndex]}/>
                </>
            }
        </SensorInfoContainer>
  );
};