import { useEffect, useState } from "react";
import {
    LocationContainer,
    LocationTitle,
    LocationInfo,
    LocationLabel,
    LocationValue,
    SensorInfoContainer,
    SensorDetailsHeader,
    Arrow
} from "../styled-components/Sensor.tsx";
import { SensorDeltaInfo, SensorPrevenirInfo, SensorList } from "../interfaces/sensorInfo.ts";
import Icon from "./Icon.tsx";
import TicketSensorTable from "./TicketSensorTable.tsx";

function isSensorDeltaInfo(sensor: SensorDeltaInfo | SensorPrevenirInfo): sensor is SensorDeltaInfo {
    return (sensor as SensorDeltaInfo).marca !== undefined;
}

const SensorDeltaDetails: React.FC<{sensor: SensorDeltaInfo}> = ({sensor}) => {

    return (
        <>
            <LocationInfo>
                <LocationLabel>Marca:</LocationLabel>
                <LocationValue>{sensor.marca}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Modelo:</LocationLabel>
                <LocationValue>{sensor.modelo}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Serie:</LocationLabel>
                <LocationValue>{sensor.serie}</LocationValue>
            </LocationInfo>
            {(sensor.latitud || sensor.longitud)  && 
            <LocationInfo>
                <LocationLabel>Ubicacion:</LocationLabel>
                <LocationValue>[ {sensor.latitud}, {sensor.longitud} ]</LocationValue>
            </LocationInfo>
            }
            <LocationInfo>
                <LocationLabel>Hora de actualización:</LocationLabel>
                <LocationValue>{new Date(sensor.hora).toLocaleString("es-ES")}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Batería actual:</LocationLabel>
                <LocationValue>{sensor.bateria}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Último nivel:</LocationLabel>
                <LocationValue>{sensor.nivel}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Última señal:</LocationLabel>
                <LocationValue>{sensor.senal}</LocationValue>
            </LocationInfo>


        </>
    )
}

const SensorDetails: React.FC<{sensor: SensorDeltaInfo | SensorPrevenirInfo}> = ({sensor}) => {

    useEffect(() => {

    }, [])

    return (
        <LocationContainer>
            
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
                    <LocationTitle>{sensors[currentIndex].name}</LocationTitle>
                    <Arrow onClick={handlePrev} disabled={disableLeftArrow}>
                        <Icon name="leftArrow" />
                    </Arrow>
                    <Arrow onClick={handleNext} disabled={disableRightArrow}>
                        <Icon name="rightArrow" />
                    </Arrow>
                </SensorDetailsHeader>
                
                <SensorDetails sensor={sensors[currentIndex]}/>

                <TicketSensorTable sensorId={sensors[currentIndex].id} errorMessage="No hay tickets abiertos para este sensor" handleViewDetails={() => console.log("View details")} />
                </>
            }
        </SensorInfoContainer>
  );
};