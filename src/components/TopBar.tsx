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
  const sensorsByLocation = useSelector((state: RootState) => state.sensorsInfo.byLocation);
  const loadingSensors = useSelector((state: RootState) => state.sensorsInfo.loading);
  const lastUpdateDate = useSelector((state: RootState) => state.sensorsMetrics.lastUpdateDate);

  const [networkOptions, setNetworkOptions] = useState([{ value: "", label: "" }]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lastUpdateDateLocal, setUpdateDateLocal] = useState("")

  const section = titleMappings[location.pathname] || { title: "defaultTitle" };

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

  const handleCreateTicketSubmit = (ticketData: { title: string; description: string }) => {
    console.log("Ticket Created:", ticketData);
    setIsDialogOpen(false);
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

      {buttons && <ButtonContainer>{buttons}</ButtonContainer>}

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
