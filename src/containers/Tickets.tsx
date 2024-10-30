import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { fetchTickets } from "../redux/reducers/ticketSlice.ts";
import { fetchAssignees } from '../redux/reducers/assigneeSlice.ts';

import {
    TicketsContainer,
    FiltersContainer
} from "../styled-components/Tickets.tsx";

import Table, { ColumnProps } from "../components/Table.tsx";
import Loading from '../components/Loading.tsx';
import { Ticket } from "../interfaces/tickets";
import Button from '../components/Button.tsx';
import Icon from '../components/Icon.tsx';

const Tickets = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const ticketsData = [{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":4,"idSensor":2,"createdDate":"2024-09-08T19:08:19.899-03:00","updatedDate":"2024-09-08T19:08:19.899-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"MANTENIMIENTO","location":"default_location"},{"idTicket":9,"idSensor":4,"createdDate":"2024-09-08T19:49:53.585-03:00","updatedDate":"2024-09-08T19:49:53.585-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":8,"idSensor":3,"createdDate":"2024-09-08T19:45:18.554-03:00","updatedDate":"2024-09-08T19:45:18.554-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"},{"idTicket":6,"idSensor":2,"createdDate":"2024-09-08T19:43:12.340-03:00","updatedDate":"2024-09-08T19:43:12.340-03:00","status":"UNASSIGNED","createdBy":"hst@ina.gob","updatedBy":"hst@ina.gob","assignee":null,"description":"segundo ticket","category":"FUERA_DE_SERVICIO","location":"Carabelas"}];
    const loading = useSelector((state: RootState) => state.ticket.loading);
    const error = useSelector((state: RootState) => state.ticket.error);
    // const assigneesData = useSelector((state: RootState) => state.assignee.assignees);
    // const locationData = useSelector((state: RootState) => state.sensor.locations);

    // State to store selected values for each filter column
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
    const [elementsPerPage, setElementsPerPage] = useState(10); // Initial default

    const handleFetchTickets = () => {
        dispatch(fetchTickets());
    };

    // Function to handle updating selected options for a specific filter
    const handleSelectChange = (key: string, values: string[]) => {
        setSelectedOptions(prev => ({
            ...prev,
            [key]: values,
        }));
    };

    useEffect(() => {
        dispatch(fetchTickets());
        dispatch(fetchAssignees());
    }, [dispatch]);

    useEffect(() => {
        // Function to calculate elements per page dynamically based on the viewport height
        const calculateRowsPerPage = () => {
        const rowHeight = window.innerHeight*0.05; // Assumed row height in pixels, adjust as needed
        console.log("rowHeight", rowHeight)
        const availableHeight = window.innerHeight*0.6; // Total height minus headers, footers, etc.
        const rows = Math.floor(availableHeight / rowHeight);
        setElementsPerPage(rows > 0 ? rows : 1); // Set at least 1 row
    };

        calculateRowsPerPage();
        window.addEventListener('resize', calculateRowsPerPage);

        return () => window.removeEventListener('resize', calculateRowsPerPage);
    }, []);

    const columns: Array<ColumnProps<Ticket>> = [
        {
            title: 'ID',
            key: 'idTicket',
            filterable: false,
        },
        {
            title: 'Sensor ID',
            key: 'idSensor',
            filterable: false,
        },
        {
            title: 'Created Date',
            key: 'createdDate',
            filterable: false,
            render: (_, row) => {
            const date = new Date(row.createdDate);
            return <span>{date.toLocaleDateString()}</span>;
    }
    },
    {
        title: 'Updated Date',
        key: 'updatedDate',
        filterable: false,
        render: (_, row) => {
        const date = new Date(row.updatedDate);
        return <span>{date.toLocaleDateString()}</span>;
    }
    },
    {
        title: 'Status',
        key: 'status',
        filterable: true,
        values: ["UNASSIGNED", "IN_PROGRESS", "COMPLETED"]
    },
    {
        title: 'Created By',
        key: 'createdBy',
        filterable: false,
    },
    {
        title: 'Updated By',
        key: 'updatedBy',
        filterable: false,
    },
    {
        title: 'Assignee',
        key: 'assignee',
        filterable: false,
        render: (_, row) => {
        return row.assignee ? <p>{row.assignee}</p> : <p>No Assignee</p>;
    }
    },
    {
        title: 'Description',
            key: 'description',
            filterable: false,
    },
    {
        title: 'Category',
            key: 'category',
            filterable: true,
            values: ["MANTENIMIENTO", "FUERA_DE_SERVICIO"]
    },
    {
        title: 'Location',
            key: 'location',
            filterable: true,
    }
    ];

    return (
        <TicketsContainer>
            {loading ? (
                <Loading />
            ) : (
                <Table
                    data={ticketsData}
                    columns={columns}
                    elementsPerPage={elementsPerPage}
                    errorMessage={error}
                />
            )}
        </TicketsContainer>
    );
};

export default Tickets;
