// services/ticketService.js
import axios from 'axios';

// Function to fetch all tickets
export const fetchTickets = async () => {
  try {
    const response = await axios.get('https://66d11cac62816af9a4f2c8f4.mockapi.io/api/v1/tickets'); // Adjust the URL as needed
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};
