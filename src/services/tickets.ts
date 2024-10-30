// services/ticketService.js
import axios from 'axios';
import {CreateTicket} from '../interfaces/tickets';

export const getAllTickets = async () => {
  try {
    const response = await axios.get('https://hst-web-server-53dq.onrender.com/delta-parana/tickets'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const getAllAssignees = async () => {
  try {
    const response = await axios.get('https://hst-web-server-53dq.onrender.com/health-check'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const createTicketService = async (ticket: CreateTicket) => {
  try {
    const response = await axios.post('https://hst-web-server-53dq.onrender.com/'+ ticket.projectType + '/tickets', ticket); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};