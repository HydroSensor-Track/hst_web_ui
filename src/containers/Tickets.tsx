import { useEffect, useState } from 'react';
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


const Tickets = () => {

    const dispatch = useDispatch<AppDispatch>();
    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const loading = useSelector((state: RootState) => state.ticket.loading);
    const error = useSelector((state: RootState) => state.ticket.error);
    const assigneesData = useSelector((state: RootState) => state.assignee.assignees);
    const locationData = useSelector((state: RootState) => state.sensor.locations);

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleFetchTickets = () => {
        dispatch(fetchTickets());
    }

    // const filteredTickets = selectedOptions.includes('all') || selectedOptions.length === 0 
    // ? ticketsData 
    // : ticketsData.filter(ticket => selectedOptions.includes(ticket.category)); // Ajusta según el atributo a filtrar

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
                    selectedValues={selectedOptions}
                    setSelectedValues={setSelectedOptions}
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
     