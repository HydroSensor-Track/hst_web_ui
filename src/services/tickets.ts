// services/ticketService.js
import axios from 'axios';

export const getAllTickets = async () => {
  try {
    const response = await axios.get('https://api.npoint.io/f789db9b1752ba579fab'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const getAllAssignees = async () => {
  try {
    const response = await axios.get('https://api.npoint.io/f87d725abd8beeed92eb'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};