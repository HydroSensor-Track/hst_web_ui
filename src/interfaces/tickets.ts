import { NETWORK, Network } from "./sensorInfo";

export interface Ticket {
    idTicket: string;
    sensor: string;
    createdDate: string;
    updatedDate: string;
    status: TicketStatus;
    createdBy: string;
    updatedBy: string;
    assignee: string | null;
    description: string;
    category: TicketCategory;
    location: string;
    red: Network
}

export interface CreateTicket{
    sensor: string;
    createdDate: string;
    updatedDate: string;
    status: TicketStatus;
    createdBy: string;
    updatedBy: string;
    assignee: string | null;
    description: string;
    category: TicketCategory;
    location: string;
    red: Network
}

export interface UpdateTicket{
    idTicket: string;
    updatedBy: string;
    status?: TicketStatus;
    assignee?: string | null;
    description?: string;
}

export enum TicketStatus {
    ASSIGNED = "ASSIGNED",
    UNASSIGNED = "UNASSIGNED",
    DONE = "DONE",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

export const TicketStatusDict: Record<TicketStatus, string> = {
    "ASSIGNED":"Asignado",
    "UNASSIGNED":"Sin asignar",
    "DONE":"Completado",
    "IN_PROGRESS": "En progreso",
    "CLOSED": "Cerrado"
}

export enum TicketCategory {
    MANTENIMIENTO = "MANTENIMIENTO",
    FUERA_DE_SERVICIO = "FUERA_DE_SERVICIO",
}

export const TicketCategoryDict: Record<TicketCategory, string> = {
    "MANTENIMIENTO":"Mantenimiento",
    "FUERA_DE_SERVICIO":"Fuera de servicio",
}

export interface TicketPayloadDelta {
    idTicket?: number;
    idSensor: number;    
    createdDate: string;
    updatedDate: string;
    status: TicketStatus;
    createdBy: string;
    updatedBy: string;
    assignee: string | null;
    description: string;
    category: TicketCategory;
    location: string;
}

export interface TicketPayloadPrevenir {
    idTicket?: number;
    sensor: string;    
    createdDate: string;
    updatedDate: string;
    status: TicketStatus;
    createdBy: string;
    updatedBy: string;
    assignee: string | null;
    description: string;
    category: TicketCategory;
}

export interface UpdateTicketPayload {
    idTicket: number;
    status?: TicketStatus;
    updatedBy: string;
    assignee?: string | null;
    description?: string;
}

export function createTicketToPayloadDelta(ticket: CreateTicket): TicketPayloadDelta {
    return {
        idSensor: parseInt(ticket.sensor, 10), // Convert `sensor` to a number
        createdDate: ticket.createdDate,
        updatedDate: ticket.updatedDate,
        status: ticket.status,
        createdBy: ticket.createdBy,
        updatedBy: ticket.updatedBy,
        assignee: ticket.assignee,
        description: ticket.description,
        category: ticket.category,
        location: ticket.location,
    };
}

export function createTicketToPayloadPrevenir(ticket: CreateTicket): TicketPayloadPrevenir {
    return {
        sensor: ticket.sensor,
        createdDate: ticket.createdDate,
        updatedDate: ticket.updatedDate,
        status: ticket.status,
        createdBy: ticket.createdBy,
        updatedBy: ticket.updatedBy,
        assignee: ticket.assignee,
        description: ticket.description,
        category: ticket.category,
    };
}

export function updateTicketToPayload(ticket: UpdateTicket): UpdateTicketPayload {
    return {
        idTicket: parseInt(ticket.idTicket.split("-")[1], 10), // Remove prefix and convert to number
        updatedBy: ticket.updatedBy,
        status: ticket.status,
        assignee: ticket.assignee,
        description: ticket.description, 
    };
}

export function transformPayloadDeltaToTicket(payload: TicketPayloadDelta): Ticket {
    return {
        idTicket: `DP-${payload.idTicket}`,
        sensor: payload.idSensor.toString(),
        createdDate: payload.createdDate,
        updatedDate: payload.updatedDate,
        status: payload.status,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy,
        assignee: payload.assignee,
        description: payload.description,
        category: payload.category,
        location: payload.location,
        red: NETWORK.DELTA_PARANA,
    };
}

export function transformPayloadPrevenirToTicket(payload: TicketPayloadPrevenir): Ticket {
    return {
        idTicket: `PR-${payload.idTicket}`,
        sensor: payload.sensor,
        createdDate: payload.createdDate,
        updatedDate: payload.updatedDate,
        status: payload.status,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy,
        assignee: payload.assignee,
        description: payload.description,
        category: payload.category,
        location: payload.sensor,
        red: NETWORK.PREVENIR,
    };
}


export function transformTicketToCreate(ticket: Ticket): CreateTicket {
    return {
        sensor: ticket.sensor,
        createdDate: ticket.createdDate,
        updatedDate: ticket.updatedDate,
        status: ticket.status,
        createdBy: ticket.createdBy,
        updatedBy: ticket.updatedBy,
        assignee: ticket.assignee,
        description: ticket.description,
        category: ticket.category,
        location: ticket.location,
        red: ticket.red,
    };
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
