// services/ticketService.js
import axios from 'axios';
import {TicketPayloadDelta, TicketPayloadPrevenir, UpdateTicketPayload} from '../interfaces/tickets';

const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL

export const getTicketsByNetwork = async (red: "delta-parana" | "prevenir") => {

  try {
    const response = await axios.get(ENDPOINT + '/' + red + '/tickets');
    return response;

  } catch (error) {
    throw new Error('Failed to fetch tickets');

  }
};

export const createTicketByNetwork = async (ticket: TicketPayloadDelta | TicketPayloadPrevenir, red: "delta-parana" | "prevenir") => {
  try {
    const response = await axios.post(ENDPOINT + '/'+ red + '/tickets', ticket);
    return response;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};

export const updateTicketByNetwork = async (ticket: UpdateTicketPayload, red: "delta-parana" | "prevenir") => {
  try {
    const response = await axios.put(ENDPOINT + '/'+ red + '/tickets', ticket);
    return response;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};

export const deleteTicketByNetwork = async (idTicket: number, red: "delta-parana" | "prevenir") => {
  try {
    const response = await axios.delete(ENDPOINT + '/'+ red + '/tickets/' + idTicket);
    return response;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};