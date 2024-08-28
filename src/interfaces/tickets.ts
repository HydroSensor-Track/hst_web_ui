// todo: deberia estar en interfaces, redux, etc y que TableProps reciba un objeto estandar, que no este atado a Tickets
export interface Ticket {
    id: string;
    fecha: string;
    estado: string;
    ubicacion: string;
    punto: number;
    sensor: string;
    responsable: string;
    descripcion: string;
}