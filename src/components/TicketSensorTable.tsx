import { TableTicketContainer, StyledTable } from "../styled-components/Sensor.tsx";
import { ReactElement } from 'react';
import {Ticket, TicketStatus} from "../interfaces/tickets.ts";
import {StyledViewDetails} from "../styled-components/Tickets.tsx";
import {useTranslation} from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";


export interface ColumnProps<T> {
    key: string;
    title: string;
    render?: (column: ColumnProps<T>, item: T) => ReactElement;
}

type Props= {
    sensorId: string;
    errorMessage: string | null;
};


const TicketSensorTable = ({ sensorId, errorMessage }: Props) => {

    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);

    const columns: Array<ColumnProps<Ticket>> = [
        {
            title: "Ticket ID",
            key: 'idTicket',
        },
        {
            title: "Categoría",
            key: 'category',
        },
        {
            title: "Fecha de Creación",
            key: 'createdDate',
            render: (_, row) => {
                const date = new Date(row.createdDate);
                return <span>{date.toLocaleDateString()}</span>;
            }
        },
    ];

    const filteredTickets = ticketsData.filter((ticket) => ticket.sensor.toString() === sensorId && ticket.status !== TicketStatus.CLOSED && ticket.status !== TicketStatus.DONE).slice(0,3);

    const headers = columns.map((column, index) => {
        return (
            <th key={index}>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',  position: 'relative', marginTop: '5px', marginBottom: '15px'}}>
                    <span>{column.title}</span>
                </div>
            </th>
        );
    });

    const rows = filteredTickets.length ? (
        filteredTickets.map((ticket, rowIndex) => (
            <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                    const value = column.render
                        ? column.render(column, ticket)
                        : (ticket[column.key as keyof Ticket] as string);
                    return <td key={colIndex}>{value}</td>;
                })}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={columns.length} className="text-center">
                <p>{errorMessage}</p>
            </td>
        </tr>
    );

    return (
        <TableTicketContainer>
            <StyledTable columnWidth={100 / columns.length}>
                <thead>
                <tr>{headers}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </StyledTable>
        </TableTicketContainer>
    );
};

export default TicketSensorTable;
