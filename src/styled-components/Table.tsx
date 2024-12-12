import styled from "styled-components";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface StyledTableProps {
  columnWidth: number;
}

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.darkGray};
    border-radius: 20px;
`;

export const TableContainer = styled.div`
    width: 100%;
    height: 90%;
    background-color: ${(props) => props.theme.colors.darkGray};
    border-radius: 20px;
`;



export const StyledTable = styled.table<StyledTableProps>`
    width: 100%;
    border-collapse: collapse;
    color: ${(props) => props.theme.colors.text};
    border-radius: 20px;

    th, td {
      padding: 0.5vh;
      text-align: center;
      font-size: ${(props) => props.theme.sizes.textFontSize};
    }

    th {
      background-color: ${(props) => props.theme.colors.darkGray};
      border-radius: 20px;
    }

    td {
      background-color: ${(props) => props.theme.colors.mediumGray};
    }

    tr:nth-child(even) td {
      background-color: ${(props) => props.theme.colors.lightGray};
    }

    th:not([style*="width"]) {
        width: auto;
    }

    a {
      color: ${(props) => props.theme.colors.textLink};
      text-decoration: none;
    }
`;

// Styled Pagination Container
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

// Styled Button Container
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 0.5rem; // Add some space between the buttons
`;

// Styled Button
export const StyledButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.disabled ? props.theme.colors.text_faded : props.theme.colors.primary)};
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1rem;
  font-weight: bold;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: ${(props) => (props.disabled ? 'none' : 'scale(1.1)')};
    background: ${(props) =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.secondary};
  }

  &:active {
    transform: ${(props) => (props.disabled ? 'none' : 'scale(0.95)')};
  }
`;

// Dots for indicating more pages visually
export const Dots = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.textLight};
  margin: 0 0.5rem;
`;
export const StyledFilterButton = styled(FilterAltIcon)<{ isActive: boolean }>`
  background: none;
  position:absolute;
  right: 0;
  border: none;
  cursor: pointer;
  font-size: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isActive }) => (isActive ? '#007bff' : 'inherit')}; /* Change color when active */
  

  &:hover {
    color: #007bff; /* Customize hover color */
  }

  &:focus {
    outline: none; /* Remove focus outline */
  }

  &:active {
    color: #0056b3; /* Change color when clicked */
  }
`;