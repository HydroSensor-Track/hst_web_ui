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
    return (
        <LocationContainer>
            <LocationTitle>{name}</LocationTitle>
            <LocationInfo>
                <LocationLabel>ID:</LocationLabel>
                <LocationValue>{id}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Marca:</LocationLabel>
                <LocationValue>{marca}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Modelo:</LocationLabel>
                <LocationValue>{modelo}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Serie:</LocationLabel>
                <LocationValue>{serie}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Nivel:</LocationLabel>
                <LocationValue>{nivel}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Bateria:</LocationLabel>
                <LocationBattery>{bateria}%</LocationBattery>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Señal:</LocationLabel>
                <LocationValue>{senal}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Hora:</LocationLabel>
                <LocationValue>{hora}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Latitud:</LocationLabel>
                <LocationValue>{latitud}</LocationValue>
            </LocationInfo>
            <LocationInfo>
                <LocationLabel>Longitud:</LocationLabel>
                <LocationValue>{longitud}</LocationValue>
            </LocationInfo>
        </LocationContainer>
    );
};