import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TicketState } from '../../interfaces/redux';
import { Ticket, formatDate } from '../../interfaces/tickets';
import { getAllTickets } from '../../services/tickets';


const initialState: TicketState = {
    tickets: [],
    loading: false,
    error: null,
  };

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
      const response = await getAllTickets();

      const data: Ticket[] = response.data.map((ticket: Ticket) => ({
        ...ticket,
        fecha: formatDate(ticket.fecha),
      }));

      return data;
  }
);


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
      });
  },
});

export default ticketSlice.reducer;