import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

import {
    TicketsContainer,
} from "../styled-components/Tickets.tsx";

import { Ticket, TicketStatus, UpdateTicket } from '../interfaces/tickets.ts';
import Table from "../components/Table.tsx";
import Loading from '../components/Loading.tsx';
import UpdateTicketDialog from '../components/UpdateTicketDialog.tsx';
import DeleteTicketDialog from '../components/DeleteTicketDialog.tsx';


const Tickets = () => {
    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const loading = useSelector((state: RootState) => state.ticket.loading);
    const error = useSelector((state: RootState) => state.ticket.error);
    const [elementsPerPage, setElementsPerPage] = useState(10); // Initial default
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [deleteTicketModal, setDeleteTicketModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket>();

    const handleUpdateTicketSubmit = (ticketData: UpdateTicket) => {
        console.log("Ticket Updated:", ticketData);
      };
    
      const handleDeleteTicket = (idTicket: string) => {
        console.log("Ticket Deleted:", idTicket);
      }

    const handleViewDetails = (ticketId: string) => {
        const ticket = ticketsData.find((t) => t.idTicket === ticketId)
        setSelectedTicket(ticket);
        setOpenTicketModal(true);
    };

    const handleModalClose = () => {
        setOpenTicketModal(false);
    };

    const handleOpenDeleteTicketModal = () => {
        setOpenTicketModal(false);
        setDeleteTicketModal(true)
    }

    const handleCloseDeleteTicketModal = () => {
        setDeleteTicketModal(false);
    }

    useEffect(() => {

        const calculateRowsPerPage = () => {
        const rowHeight = window.innerHeight*0.05;
        const availableHeight = window.innerHeight*0.6;
        const rows = Math.floor(availableHeight / rowHeight);
        setElementsPerPage(rows > 0 ? rows : 1);
    };

        calculateRowsPerPage();
        window.addEventListener('resize', calculateRowsPerPage);

        return () => window.removeEventListener('resize', calculateRowsPerPage);
    }, []);



    return (
        <TicketsContainer>
            {loading ? (
                <Loading />
            ) : (
                <Table
                    data={ticketsData}
                    elementsPerPage={elementsPerPage}
                    errorMessage={error}
                    handleViewDetails={handleViewDetails}
                />
            )}
            {(openTicketModal && selectedTicket) && (
                <UpdateTicketDialog
                    open={openTicketModal}
                    onClose={handleModalClose}
                    onDelete={handleOpenDeleteTicketModal}
                    mode='edit'
                    initialData={selectedTicket}
                    onSubmit={handleUpdateTicketSubmit}
                    disabledEdit={selectedTicket.status === TicketStatus.CLOSED || selectedTicket.status === TicketStatus.DONE ? true : false}
                />
            )}
            {(deleteTicketModal && selectedTicket) && (
                <DeleteTicketDialog
                    open={deleteTicketModal}
                    onClose={handleCloseDeleteTicketModal}
                    idTicket={selectedTicket.idTicket}
                    red={selectedTicket.red}
                    onSubmit={handleDeleteTicket}
                />
            )}
        </TicketsContainer>
    );
};

export default Tickets;
