import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { fetchTickets } from "../redux/reducers/ticketSlice.ts";
import { fetchAssignees } from '../redux/reducers/assigneeSlice.ts';
import { sensorsLocation } from '../redux/reducers/sensorSlice.ts';

import {
    TicketsContainer,
    FiltersContainer
} from "../styled-components/Tickets.tsx";
import {
    DateInput,
    SearchInput,
} from "../styled-components/Filter.tsx";

import Table, {ColumnProps} from "../components/Table.tsx";
import { FilterSelect } from "../components/FilterSelect.tsx";
import Loading from '../components/Loading.tsx';
import { Ticket } from "../interfaces/tickets";
import Button from '../components/Button.tsx';
import Icon from '../components/Icon.tsx';



// TODO: Se deberian buscar los datos cuando se inicia la pagina por primera vez y cada vez que hay un cambio ////////////////////77
// const data: Ticket[] = [
//     {
//         id: "ABC123",
//         fecha: "22/06/2024",
//         estado: "Completado",
//         ubicacion: "Atucha II",
//         sensor: "201704123",
//         responsable: "Juan Pablo",
//         descripcion: "Ver detalle"
//     },
//     {
//         id: "DEF456",
//         fecha: "24/06/2024",
//         estado: "Pendiente",
//         ubicacion: "Atucha II",
//         sensor: "201704123",
//         responsable: "Belen Buceta",
//         descripcion: "Ver detalle"
//     }
// ];


// TODO: En el caso de las columnas deberian ser los valores de las options
///////////////////////////////////////////

const Tickets = () => {

    const dispatch = useDispatch<AppDispatch>();
    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const loading = useSelector((state: RootState) => state.ticket.loading);
    const error = useSelector((state: RootState) => state.ticket.error);
    const assigneesData = useSelector((state: RootState) => state.assignee.assignees);
    const locationData = useSelector((state: RootState) => state.sensor.locations);

    const handleFetchTickets = () => {
        dispatch(fetchTickets());
    }

    useEffect(() => {
        dispatch(fetchTickets());
        dispatch(fetchAssignees())
        dispatch(sensorsLocation());
    }, [dispatch]);

    const columns: Array<ColumnProps<Ticket>> = [
        {
            title: 'ID',
            key: 'id',
            filterable: false
        },
        {
            title: 'Fecha',
            key: 'fecha',
            filterable: false
        },
        {
            title: 'Estado',
            key: 'estado',
            filterable: true,
            values: ["Pendiente", "En progreso", "Completado"]
        },
        {
            title: 'Ubicacion',
            key: 'ubicacion',
            filterable: true,
            values: locationData
        },
        {
            title: 'Sensor',
            key: 'sensor',
            filterable: false
        },
        {
            title: 'Responsable',
            key: 'responsable',
            filterable: true,
            values: assigneesData.map(assignee => assignee.email)
        },
        {
            title: 'Descripcion',
            key: 'descripcion',
            filterable: false,
            render: (_, ticket) => {
                // Se deberia abrir un pop up con el detalle y que en realidad el "Ver detalle" sea fijo
                return <a>{ticket.descripcion}</a>;
              },
        }
    ]

    return (
        <TicketsContainer>
            <FiltersContainer>
            {columns
                .filter((column) => column.filterable)
                .map((column) => (
                <FilterSelect
                    key={column.key}
                    placeholder={column.title}
                    options={column.values ? column.values : ["No hay datos"]} // TODO: Constante de texto 
                />
                ))}
                <DateInput type="date" />
                <SearchInput type="text" placeholder="Buscar por ID de Ticket o número de serie de Sensor" /> {/* TODO: Constante de texto */}
                <Button onClick={handleFetchTickets} icon={<Icon name={"reload"} />} />
            </FiltersContainer>

            {loading ? <Loading/> : <Table data={ticketsData} columns={columns} elementsPerPage={10} errorMessage={error}/>}
        
        </TicketsContainer>
    )
}


export default Tickets;