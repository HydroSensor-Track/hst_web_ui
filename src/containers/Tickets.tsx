import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { fetchTickets } from "../redux/reducers/ticketSlice.ts";
import { fetchAssignees } from '../redux/reducers/assigneeSlice.ts';

import {
    TicketsContainer
} from "../styled-components/Tickets.tsx";

import Table from "../components/Table.tsx";
import Loading from '../components/Loading.tsx';
import TicketDetailModal from '../components/TicketModal.tsx';

const Tickets = () => {
    const dispatch = useDispatch<AppDispatch>();
    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const loading = useSelector((state: RootState) => state.ticket.loading);
    const error = useSelector((state: RootState) => state.ticket.error);
    // const assigneesData = useSelector((state: RootState) => state.assignee.assignees);
    // const locationData = useSelector((state: RootState) => state.sensor.locations);

    const [elementsPerPage, setElementsPerPage] = useState(10); // Initial default
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

    const handleViewDetails = (ticketId: number) => {
        setSelectedTicketId(ticketId);
        setOpenTicketModal(true);
    };

    const handleModalClose = () => {
        setOpenTicketModal(false);
        setSelectedTicketId(null);
    };

    useEffect(() => {
        dispatch(fetchTickets());
        dispatch(fetchAssignees());
    }, [dispatch]);

    useEffect(() => {

        const calculateRowsPerPage = () => {
            const rowHeight = window.innerHeight * 0.05;
            const availableHeight = window.innerHeight * 0.6;
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
                    errorMessage={error} handleViewDetails={handleViewDetails}
                />
            )}
            {openTicketModal && (
                <TicketDetailModal
                    open={openTicketModal}
                    onClose={handleModalClose}
                    ticketId={selectedTicketId}
                />
            )}
        </TicketsContainer>
    );
};

export default Tickets;
