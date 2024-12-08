import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Network } from '../../interfaces/sensorInfo';
import { downloadReportByNetwork} from '../../services/reports';


interface ReportState {
  loading: boolean;
  error: string | null;
}


const initialState: ReportState = {
  loading: false,
  error: null,
};


export const downloadReport = createAsyncThunk(
  'reports/generateReport',
  async ({ red }: { red: "delta-parana" | "prevenir" }) => {

    const now = new Date();

    // Retrocede un mes
    const closedDate = new Date(now.getFullYear(), now.getMonth() - 1);

    const month = closedDate.getMonth() + 1; // +1 porque los meses empiezan en 0
    const year = closedDate.getFullYear();

    const response = await downloadReportByNetwork(red, month, year)

    // Crea un Blob a partir de los datos de la respuesta
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Crea una URL temporal para el Blob
    const url = window.URL.createObjectURL(blob);

    // Crea un elemento <a> para iniciar la descarga
    const a = document.createElement('a');
    a.href = url;

    // Establece un nombre para el archivo descargado
    a.download = 'reporte_' + red.replace(/-/g, "_"); + '_' + month + '_' + year + '.pdf'; // Cambia el nombre según sea necesario
    a.click();

    // Limpia la URL temporal
    window.URL.revokeObjectURL(url);
    
  }
);

const sensorInfoSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(downloadReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error downloading report';
      });
  },
});

export default sensorInfoSlice.reducer;