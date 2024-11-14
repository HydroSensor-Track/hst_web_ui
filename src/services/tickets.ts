// services/ticketService.js
import axios from 'axios';
import {CreateTicket} from '../interfaces/tickets';

const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL

export const getAllTickets = async () => {
  try {
    const response = await axios.get(ENDPOINT + '/delta-parana/tickets'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const getAllAssignees = async () => {
  try {
    const response = await axios.get(ENDPOINT + '/health-check'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const createTicketService = async (ticket: CreateTicket) => {
  try {
    const response = await axios.post(ENDPOINT + '/'+ ticket.projectType + '/tickets', ticket); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};