
import React from "react";
import { StyledTable } from "../styled-components/Table";
import { Ticket } from "../interfaces/tickets";

// TODO: Hacer que no reciba directamente Ticket si no un objeto y mapearlo

interface TableProps {
    data: Ticket[]
}

const Table: React.FC<TableProps> = ({ data }) => {
    // const theme = useTheme();
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Ticket</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Ubicación</th>
                    <th>Punto</th>
                    <th>Sensor</th>
                    <th>Responsable</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                {data.map(ticket => (
                    <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.fecha}</td>
                        <td>{ticket.estado}</td>
                        <td>{ticket.ubicacion}</td>
                        <td>{ticket.punto}</td>
                        <td>{ticket.sensor}</td>
                        <td>{ticket.responsable}</td>
                        <td>{ticket.descripcion}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    )
}

// const Button: React.FC<ButtonProps> = ({
//   icon = null,
//   label,
//   onClick,
//   type = "button",
//   disabled = false,
//   className,
// }) => {
//   const theme = useTheme();
//   return (
//     <StyledButton
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={className}
//     >
//       {React.cloneElement(icon as React.ReactElement, {
//         style: { fontSize: theme.sizes.iconSize },
//       })}
//       {label}
//     </StyledButton>
//   );
// };

export default Table;

