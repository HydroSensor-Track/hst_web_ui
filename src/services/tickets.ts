// services/ticketService.js
import axios from 'axios';

// Function to fetch all tickets
export const getAllTickets = async () => {
  try {
    const response = await axios.get('https://66d11cac62816af9a4f2c8f4.mockapi.io/api/v1/tickets'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const getAllAssignees = async () => {
  try {
    const response = await axios.get('https://66d11cac62816af9a4f2c8f4.mockapi.io/api/v1/assignees'); // Adjust the URL as needed
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};