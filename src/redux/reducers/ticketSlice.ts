import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TicketState } from '../../interfaces/redux';
import { Ticket } from '../../interfaces/tickets';
import { fetchTickets } from '../../services/tickets';

const INITIAL_STATE: TicketState = {
    tickets: [],
    loading: false,
    error: null,
  };

export const getAllTickets = createAsyncThunk<any, void>(
  '/api/tickets',
  async () => {
      const response = await fetchTickets();
      const data: Ticket[] = response;
      return data;
  }
);

const ticketSlice = createSlice({
  name: 'sensor',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
      builder.addCase(getAllTickets.fulfilled, (state, action) => {
          state.tickets = action.payload;
      });
      builder.addCase(getAllTickets.rejected, (state, action) => {
          state.error = action.error.message || 'Error fetching locations';
      });
      builder.addCase(getAllTickets.pending, state => {
          state.loading = true;
          state.error = null;
      });
  }
});

export default ticketSlice.reducer;