import styled from "styled-components";

export const SensorInfoContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.componentBackground};
  border-radius: 12px;
  height: 65%;
`;

export const LocationContainer = styled.div`
  color: ${(props) => props.theme.colors.text};
  padding-left: 15px;

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LocationTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 0;
  width: 100%;
  `;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

`;

export const LocationLabel = styled.span`
  font-weight: bold;
`;

export const LocationValue = styled.span`
  font-size: 16px;
`;

export const LocationBattery = styled(LocationValue)`
  color: #ffc107;
`;

export const SensorDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const Arrow = styled.button`
  background: none;
  border: none;
  color: #fff;
  margin-top: 10px;
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