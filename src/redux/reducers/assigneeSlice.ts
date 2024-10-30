import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AssigneeState } from '../../interfaces/redux';
import { Assignee } from '../../interfaces/assignee';
import { getAllAssignees } from '../../services/tickets';


const initialState: AssigneeState = {
    assignees: [],
    loading: false,
    error: null,
  };

export const fetchAssignees = createAsyncThunk(
  'tickets/assignees',
  async () => {
    const response = await getAllAssignees();
    const data: Assignee[] = response.data;
    return data;
  }
)

const assigneelice = createSlice({
  name: 'assignees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignees.fulfilled, (state, action) => {
        state.loading = false;
        state.assignees = action.payload;
      })
      .addCase(fetchAssignees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default assigneelice.reducer;