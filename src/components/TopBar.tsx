import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useTranslation } from "react-i18next";
import NormalTitle from "./NormalTitle.tsx";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { useState } from "react";
import CreateTicketDialog from "./CreateTicketDialog.tsx";  // Import the dialog component

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
      {
        label: "createGraph",
        icon_name: "eastArrow",
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
  const section = titleMappings[location.pathname] || "dashboard";

  // State to handle opening/closing of dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTicketClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCreateTicketSubmit = (ticketData: { title: string; description: string }) => {
    console.log('Ticket Created:', ticketData);
    // Add your logic here to submit the ticket data to the backend

  };

  return (
      <StyledTopBar className={className}>
        <NormalTitle>{t(section.title)}</NormalTitle>
        {section.buttons && (
            <ButtonContainer>
              {section.buttons.map((button) => (
                  <Button
                      key={button.label}
                      label={t(button.label)}
                      icon={<Icon name={button.icon_name} />}
                      onClick={button.label === "createTicket" ? handleCreateTicketClick : undefined} // Open dialog when "createTicket" button is clicked
                  />
              ))}
            </ButtonContainer>
        )}

        {/* Create Ticket Dialog */}
        {isDialogOpen && <CreateTicketDialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            onSubmit={handleCreateTicketSubmit}
        />}
      </StyledTopBar>
  );
};

export default TopBar;
