import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TicketState } from '../../interfaces/redux';
import { CreateTicket, createTicketToPayloadDelta, createTicketToPayloadPrevenir, Ticket, TicketPayloadDelta, TicketPayloadPrevenir, transformPayloadDeltaToTicket, transformPayloadPrevenirToTicket, UpdateTicket, UpdateTicketPayload, updateTicketToPayload } from '../../interfaces/tickets';
import { getTicketsByNetwork, createTicketByNetwork, updateTicketByNetwork, deleteTicketByNetwork } from '../../services/tickets';
import { Network, NETWORK } from '../../interfaces/sensorInfo';

const initialState: TicketState = {
    tickets: [],
    loading: false,
    error: null,
};


export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async () => {
        const responseDelta = await getTicketsByNetwork(NETWORK.DELTA_PARANA);
        const responsePrevenir = await getTicketsByNetwork(NETWORK.PREVENIR);

        let data: Ticket[] = responseDelta.data.map((ticket: TicketPayloadDelta) => transformPayloadDeltaToTicket(ticket));

        data = [...data, ...responsePrevenir.data.map((ticket: TicketPayloadPrevenir) => transformPayloadPrevenirToTicket(ticket))]

        data.sort((a: Ticket, b: Ticket) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

        return data;
    }
);

export const createTicket = createAsyncThunk(
    'tickets/createTicket',
    async ({ ticket, red }: { ticket: CreateTicket ; red: Network }) => {

        const createdTicket = red == NETWORK.DELTA_PARANA ? createTicketToPayloadDelta(ticket) : createTicketToPayloadPrevenir(ticket) ;
        const response = await createTicketByNetwork(createdTicket, red);
        return response.data;
    }
);

export const updateTicket = createAsyncThunk(
    'tickets/updateTicket',
    async ({ ticket, red }: { ticket: UpdateTicket ; red: Network }) => {
        const updatedTicket: UpdateTicketPayload = updateTicketToPayload(ticket)
        const response = await updateTicketByNetwork(updatedTicket, red);
        return response.data;
    }
);

export const deleteTicket = createAsyncThunk(
    'tickets/deleteTcket',
    async ({ idTicket, red }: { idTicket: string ; red: Network }) => {
        const idTicketNum = parseInt(idTicket.split("-")[1], 10)
        const response = await deleteTicketByNetwork(idTicketNum, red);
        return response.data;
    }
)

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const red = action.meta.arg.red;
                const createdTicket = red == NETWORK.DELTA_PARANA ? transformPayloadDeltaToTicket(action.payload as TicketPayloadDelta) : transformPayloadPrevenirToTicket(action.payload as TicketPayloadPrevenir) ;
                state.tickets = [createdTicket, ...state.tickets];
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create ticket';
            })
            .addCase(updateTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const red = action.meta.arg.red;
                const updatedTicket = red == NETWORK.DELTA_PARANA ? transformPayloadDeltaToTicket(action.payload as TicketPayloadDelta) : transformPayloadPrevenirToTicket(action.payload as TicketPayloadPrevenir) ;
                state.tickets = state.tickets.map((ticket) =>
                    ticket.idTicket === updatedTicket.idTicket ? updatedTicket : ticket
                );
            })
            .addCase(updateTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update ticket';
            })
            .addCase(deleteTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const idTicket = action.meta.arg.idTicket;
                state.tickets = state.tickets.filter(ticket => ticket.idTicket !== idTicket)
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update ticket';
            })
            ;
    },
});

export default ticketSlice.reducer;
