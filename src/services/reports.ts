// services/ticketService.js
import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL

export const downloadReportByNetwork = async (red: "delta-parana" | "prevenir", month: number, year: number) => {

  try {

    const response = await axios.get(ENDPOINT + '/' + red + '/reports?month=' + month + '&year=' + year, 
        {
            responseType: 'blob'
        }
    );

    return response;

  } catch (error) {
    throw new Error('Hubo un problema al descargar el reporte para la red ' + red);

  }
};