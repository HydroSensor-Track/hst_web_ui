import {
    TicketsContainer,
    FiltersContainer,
    TableContainer,
} from "../styled-components/Tickets.tsx";
import Table from "../components/Table.tsx"
import { Ticket } from "../interfaces/tickets";

const data: Ticket[] = [
    {
        id: "ABC123",
        fecha: "22/06/2024",
        estado: "Pendiente",
        ubicacion: "Antucha II",
        punto: 1,
        sensor: "201704123",
        responsable: "Juan Pablo",
        descripcion: "Ver detalle"
    },
    {
        id: "DEF456",
        fecha: "22/06/2024",
        estado: "Pendiente",
        ubicacion: "Antucha II",
        punto: 1,
        sensor: "201704123",
        responsable: "Belen Buceta",
        descripcion: "Ver detalle"
    }
];

const Tickets = () => {
    return (
        <TicketsContainer>
            <FiltersContainer>
                {/* Aquí van los filtros */}
            </FiltersContainer>
            <TableContainer>
                <Table data={data}/>
            </TableContainer>
        </TicketsContainer>
    )
}


export default Tickets;