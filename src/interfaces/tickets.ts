
export interface Ticket {
    idTicket: number;
    idSensor: number;
    createdDate: string;
    updatedDate: string;
    status: string;
    createdBy: string;
    updatedBy: string;
    assignee: string | null;
    description: string;
    category: string;
    location: string;
    projectType: string;
}


export interface CreateTicket{
    idSensor: number;
    createdDate: string;
    updatedDate: string;
    status: string;
    createdBy: string;
    updatedBy: string;
    assignee: string | null;
    description: string;
    category: string;
    location: string;
    projectType: string;
}


export const formatDate = (date: string): string => {
    const formatedDate = new Date(date);
    return formatedDate.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).replace(',', ''); // Ejemplo: "04-9-2024 15:30"
};
