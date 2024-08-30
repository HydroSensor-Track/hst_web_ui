import {
    TicketsContainer,
    FiltersContainer
} from "../styled-components/Tickets.tsx";
import {
    DateInput,
    SearchInput,
} from "../styled-components/Filter.tsx";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FilterSelect } from "../components/FilterSelect.tsx";
import { Ticket } from "../interfaces/tickets";
import { ColumnProps } from "../components/Table.tsx";
import Table from "../components/Table.tsx";
import { RootState, AppDispatch } from "../redux/store.ts";
import { getAllTickets } from "../redux/reducers/ticketSlice.ts";

// TODO: Se deberian buscar los datos cuando se inicia la pagina por primera vez y cada vez que hay un cambio ////////////////////77
// const data: Ticket[] = [
//     {
//         id: "ABC123",
//         fecha: "22/06/2024",
//         estado: "Pendiente",
//         ubicacion: "Atucha II",
//         sensor: "201704123",
//         responsable: "Juan Pablo",
//         descripcion: "Ver detalle"
//     },
//     {
//         id: "DEF456",
//         fecha: "22/06/2024",
//         estado: "Pendiente",
//         ubicacion: "Atucha II",
//         sensor: "201704123",
//         responsable: "Belen Buceta",
//         descripcion: "Ver detalle"
//     }
// ];

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
        values: ["Atucha I", "Atucha II"]
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
        values: ["Juan Pablo", "Belen"]
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
// TODO: En el caso de las columnas deberian ser los valores de las options
///////////////////////////////////////////

const Tickets = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { tickets } = useSelector((state: RootState) => state.ticket);

    useEffect(() => {
        dispatch(getAllTickets());
    }, []);

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
            </FiltersContainer>
            <Table data={tickets} columns={columns} elementsPerPage={10}/>
        
        </TicketsContainer>
    )
}


export default Tickets;