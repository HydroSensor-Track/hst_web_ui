
export interface Ticket {
    id: string;
    fecha: string;
    estado: string;
    ubicacion: string;
    sensor: string;
    responsable: string;
    descripcion: string;
}


export const formatDate = (date: string): string => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).replace(',', ''); // Ejemplo: "04-9-2024 15:30"
};
