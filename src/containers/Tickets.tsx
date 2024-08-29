import {
    TicketsContainer,
    FiltersContainer,
    TableContainer,
} from "../styled-components/Tickets.tsx";
import { Ticket } from "../interfaces/tickets";
import { ColumnProps } from "../components/Table.tsx";
import Table from "../components/Table.tsx";

const data: Ticket[] = [
    {
        id: "ABC123",
        fecha: "22/06/2024",
        estado: "Pendiente",
        ubicacion: "Antucha II",
        sensor: "201704123",
        responsable: "Juan Pablo",
        descripcion: "Ver detalle"
    },
    {
        id: "DEF456",
        fecha: "22/06/2024",
        estado: "Pendiente",
        ubicacion: "Antucha II",
        sensor: "201704123",
        responsable: "Belen Buceta",
        descripcion: "Ver detalle"
    }
];

const columns: Array<ColumnProps<Ticket>> = [
    {
        title: 'ID',
        key: 'id'
    },
    {
        title: 'Fecha',
        key: 'fecha'
    },
    {
        title: 'Estado',
        key: 'estado'
    },
    {
        title: 'Ubicacion',
        key: 'ubicacion'
    },
    {
        title: 'Sensor',
        key: 'sensor'
    },
    {
        title: 'Responsable',
        key: 'responsable'
    },
    {
        title: 'Descripcion',
        key: 'descripcion',
        render: (_, ticket) => {
            // Se deberia abrir un pop up con el detalle y que en realidad el "Ver detalle" sea fijo
            return <a>{ticket.descripcion}</a>;
          },
    }

]


const Tickets = () => {
    return (
        <TicketsContainer>
            <FiltersContainer>
                {/* Aquí van los filtros */}
            </FiltersContainer>
            <TableContainer>
                <Table data={data} columns={columns} />
            </TableContainer>
        </TicketsContainer>
    )
}


export default Tickets;