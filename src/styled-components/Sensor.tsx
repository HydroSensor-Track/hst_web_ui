import styled from "styled-components";

interface StyledTableProps {
  columnWidth: number;
}

export const SensorInfoContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.componentBackground};
  border-radius: 12px;
  height: 50%;
`;

export const SensorDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  height: 10%;
`;

export const TableTicketContainer = styled.div`
  width: 100%;
  height: 40%;
  background-color: ${(props) => props.theme.colors.darkGray};
  display:flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0 0 20px 20px;
`;

export const StyledTable = styled.table<StyledTableProps>`
    width: 90%;
    border-collapse: collapse;
    color: ${(props) => props.theme.colors.text};
    border-radius: 20px;

    th, td {
      text-align: center;
      font-size: ${(props) => props.theme.sizes.textFontSize};
      width: ${(props) => props.columnWidth}%;
    }

    a {
      color: ${(props) => props.theme.colors.textLink};
      text-decoration: none;
    }
`;

export const LocationContainer = styled.div`
  color: ${(props) => props.theme.colors.text};
  padding-left: 15px;
  height: 50%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

export const LocationTitle = styled.h1`
  font-size: 2.5vh;
  font-weight: bold;
  margin-bottom: 0.5vh;
  margin-top: 0.5vh;
  margin-left: 1.5vh;
  width: 100%;
  `;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;

`;

export const LocationLabel = styled.span`
  font-weight: bold;
  font-size: 1.8vh;
`;

export const LocationValue = styled.span`
  font-size: 1.8vh;
`;

export const LocationBattery = styled(LocationValue)`
  color: #ffc107;
`;



export const Arrow = styled.button`
  background: none;
  border: none;
  color: #fff;
  margin-top: 8px;
  padding: 0;
  font-size: 32px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2684FF;
  }

  &:disabled {
    color: #888; /* Cambia este color a lo que prefieras para el estado deshabilitado */
    cursor: not-allowed; /* Cambia el cursor para indicar que el botón está deshabilitado */
    opacity: 0.5; /* Opcional: reduce la opacidad para un efecto visual */
  }
`;