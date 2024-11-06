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
import { setRed } from "../redux/reducers/querySlice.ts";
import { customStyles } from "../styled-components/FilterPanel.tsx";
import Select, { SingleValue } from 'react-select';
import { fetchSensorsInfo } from "../redux/reducers/sensorInfoSlice.ts";
import { Ticket } from "../interfaces/tickets.ts";

interface TopBarProps {
  className?: string;
}

interface SectionProps {
  title: string;
  buttons?: { label: string; icon_name: string }[];
}

type ButtonHandlerKeys = 'createTicket' | 'addNewUser' | 'changePassword' | 'downloadReport';

type ButtonHandlers = {
  [key in ButtonHandlerKeys]: () => void;
};

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
    buttons: [
      {
        label: "addNewUser",
        icon_name: "addUser",
      },
    ],
  },
  "/users": {
    title: "userProfile",
    buttons: [
      {
        label: "changePassword",
        icon_name: "changePassword",
      },
    ]
  }
};

const TopBar = ({ className }: TopBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { updateOpenModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const currentNetwork = useSelector((state: RootState) => state.queryChart.red);
  const sensorsByLocation = useSelector((state: RootState) => state.sensorsInfo.byLocation);
  const loadingSensors = useSelector((state: RootState) => state.sensorsInfo.loading)

  const [networkOptions, setNetworkOptions] = useState([{ value: "", label: "" }]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const locationPath = location.pathname.startsWith("/users/") ?
    "/users" : location.pathname;

  const section = titleMappings[locationPath] || { title: "defaultTitle" };

  const buttonHandlers: ButtonHandlers = {
    "createTicket": () => setIsDialogOpen(true),
    "addNewUser": () => updateOpenModal(true),
    "changePassword": () => updateOpenModal(true),
    "downloadReport": () => { console.log("Download report") }
    // Add more handlers as needed
  };

  const handleNetworkChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    dispatch(setRed(selectedOption ? selectedOption.label : ""));
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
  }, [sensorsByLocation]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  /*const handleCreateTicketSubmit = (ticketData: { title: string; description: string }) => {
    console.log("Ticket Created:", ticketData);
    setIsDialogOpen(false);
  };*/

  const handleCreateTicketSubmit = (ticketData: Ticket) => {
    console.log("Ticket Created:", ticketData);
    setIsDialogOpen(false);
  };

  const buttons = section.buttons
    ? section.buttons.map((button) => (
      <Button
        key={button.label}
        label={t(button.label)}
        icon={<Icon name={button.icon_name} />}
        onClick={buttonHandlers[button.label as ButtonHandlerKeys] || undefined}
      />
    ))
    : useButtonConfig(t, buttonHandlers)[locationPath] || null;

  const handleRefresh = () => {
    console.log("Fetching sensors")
    dispatch(fetchSensorsInfo())
  }

  return (
    <StyledTopBar className={className}>
      <NormalTitle>{t(section.title)}</NormalTitle>

      {locationPath === "/" && (
        <>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "20%", alignItems: "center" }}>
            <Select
              value={networkOptions.find(option => option.value === currentNetwork)}
              options={networkOptions}
              name="networks"
              placeholder="Red"
              onChange={handleNetworkChange}
              styles={customStyles}
            />
            <Button onClick={handleRefresh} icon={<Icon name="refresh" />} disabled={loadingSensors} />
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
