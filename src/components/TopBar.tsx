import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useButtonConfig } from "../utils/ButtonConfig.tsx";
import NormalTitle from "./NormalTitle.tsx";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { useModal } from "../contexts/ModalContext.tsx";
import CreateTicketDialog from "./CreateTicketDialog.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { setRed, setTimestampFin, setTimestampInicio } from "../redux/reducers/querySlice.ts";
import { customStyles } from "../styled-components/FilterPanel.tsx";
import Select, { SingleValue } from 'react-select';
import { fetchSensorsInfo } from "../redux/reducers/sensorInfoSlice.ts";
import { fetchInitialMetricUpdate } from "../redux/reducers/sensorMetricsSlice.ts";
import { fetchTickets } from "../redux/reducers/ticketSlice.ts";
import { Ticket } from "../interfaces/tickets.ts";
import { downloadReport } from "../redux/reducers/reportsSlice.ts";
import { Network } from "../interfaces/sensorInfo.ts";

interface TopBarProps {
  className?: string;
}

interface SectionProps {
  title: string;
  buttons?: { label: string; icon_name: string }[];
}

const titleMappings: Record<string, SectionProps> = {
  "/": {
    title: "dashboard",
    buttons: [
      {
        label: "downloadReport",
        icon_name: "download",
      },
    ],
  },
  "/tickets": {
    title: "tickets",
    buttons: [
      {
        label: "createTicket",
        icon_name: "add",
      },
    ],
  },
  "/notifications": {
    title: "notifications",
  },
  "/backoffice": {
    title: "backoffice",
  },
};

const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { updateOpenModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const currentNetwork = useSelector((state: RootState) => state.queryChart.red);
  const loadingReport = useSelector((state: RootState) => state.reports.loading);
  const sensorsByLocation = useSelector((state: RootState) => state.sensorsInfo.byLocation);
  const loadingSensors = useSelector((state: RootState) => state.sensorsInfo.loading);
  const lastUpdateDate = useSelector((state: RootState) => state.sensorsMetrics.lastUpdateDate);

  const [networkOptions, setNetworkOptions] = useState([{ value: "", label: "" }]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lastUpdateDateLocal, setUpdateDateLocal] = useState("")

  const section = titleMappings[location.pathname] || { title: "Perfil de usuario" };

  const buttonHandlers = {
    "createTicket": () => setIsDialogOpen(true),
    "addNewUser": () => updateOpenModal(true),
    "changePassword": () => updateOpenModal(true),
    "downloadReport": () => {console.log("Download report")}
    // Add more handlers as needed
  };

  const handleNetworkChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    const networkSelected = selectedOption ? selectedOption.value as "delta-parana" | "prevenir" : currentNetwork
    dispatch(setRed(networkSelected));

  };
  
  const handleDownloadReport = async () => {
    try {
        alert(`Descargando reporte para ${currentNetwork === "delta-parana" ? "Delta Paraná" : "Prevenir"}`);
        
        // Esperar a que la acción termine
        const result = await dispatch(downloadReport({ red: currentNetwork }));

        // Verificar si la acción fue exitosa
        if (result.meta.requestStatus === "fulfilled") {
            alert("¡Reporte descargado con éxito!");
        } else {
            alert(`No se pudo descargar el reporte para ${currentNetwork === "delta-parana" ? "Delta Paraná" : "Prevenir"}. Por favor, inténtalo nuevamente.`);
        }
    } catch (error) {
        alert(`Ocurrió un error al descargar el reporte para ${currentNetwork === "delta-parana" ? "Delta Paraná" : "Prevenir"}. Por favor, verifica tu conexión e inténtalo de nuevo.`);
        console.error("Error al descargar:", error);
    }
};

  useEffect(() => {

    const networkArray = Object.keys(sensorsByLocation);
    if (sensorsByLocation && networkArray.length > 0) {
      const networks = networkArray.map((key) => ({
        value: key,
        label: key,
      }));
      setNetworkOptions(networks);
    }
    const utc = new Date(lastUpdateDate as string)
    const offset = utc.getTimezoneOffset();
    const local = new Date(utc.getTime() - (offset * 60000));
    setUpdateDateLocal(local.toISOString())
  }, [sensorsByLocation, lastUpdateDate]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCreateTicketSubmit = (ticketData: Ticket) => {
    console.log("Ticket Created:", ticketData);
    dispatch(fetchTickets())
  };

  const buttons = section.buttons
    ? section.buttons.map((button) => (
        <Button
          key={button.label}
          label={t(button.label)}
          icon={<Icon name={button.icon_name} />}
          onClick={buttonHandlers[button.label] || undefined}
        />
      ))
    : useButtonConfig(t, buttonHandlers)[location.pathname] || null;

  const handleRefresh = () => {
    console.log("Fetching sensors and metrics")
    dispatch(fetchSensorsInfo())
    const currentDate = new Date();
    const fromDate = new Date(currentDate);
    fromDate.setHours(currentDate.getHours() - 24);
    dispatch(setTimestampFin(currentDate.toISOString()));
    dispatch(setTimestampInicio(fromDate.toISOString()));
    dispatch(fetchInitialMetricUpdate({ from: fromDate, to: currentDate }));
  }

  useEffect(() => {
    console.log(titleMappings[location.pathname])
  })

  return (
    <StyledTopBar className={className}>
      <NormalTitle>{t(section.title)}</NormalTitle>

      {location.pathname === "/" && (
        <>
        <div  style={{display: "flex", flexDirection: "column", width: "40%", alignItems: "center"}}>
          <div  style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>

              <Select 
                value={networkOptions.find(option => option.value === currentNetwork)}
                options={networkOptions}
                name="networks"
                placeholder="Red"
                onChange={handleNetworkChange}
                styles={customStyles} 
                />
              <Button onClick={handleRefresh} icon={<Icon name="refresh"/>} disabled={loadingSensors} />
            </div>
            <p style={{fontSize: "12px"}}>Última actualización: {new Date(lastUpdateDateLocal).toUTCString()}</p>
        </div>
        
        </>
      )}

      {(buttons && titleMappings[location.pathname].title == "dashboard") ?
       <Button onClick={handleDownloadReport} icon={<Icon name="download"/>} disabled={loadingReport} label={"Descargar reporte " + currentNetwork}/> :
       <ButtonContainer>{buttons}</ButtonContainer>
       }

      {/* Create Ticket Dialog */}
      {isDialogOpen && (
        <CreateTicketDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleCreateTicketSubmit}
        />
      )}
    </StyledTopBar>
  );
};

export default TopBar;
