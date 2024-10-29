import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useButtonConfig } from "../utils/ButtonConfig.tsx";
import NormalTitle from "./NormalTitle.tsx";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { useModal } from "../contexts/ModalContext.tsx";
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
    const { updateOpenModal } = useModal();

    // State to handle opening/closing of dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const section = titleMappings[location.pathname] || { title: "defaultTitle" };

    const buttonHandlers = {
        "createTicket": () => setIsDialogOpen(true),
        "addNewUser": () => updateOpenModal(true),
        "changePassword": () => updateOpenModal(true)
        // Add more handlers as needed
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleCreateTicketSubmit = (ticketData: { title: string; description: string }) => {
        console.log("Ticket Created:", ticketData);
        // Add your logic here to submit the ticket data to the backend
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

    return (
        <StyledTopBar className={className}>
            <NormalTitle>{t(section.title)}</NormalTitle>
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
