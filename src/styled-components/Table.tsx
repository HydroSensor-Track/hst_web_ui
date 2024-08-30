import styled from "styled-components";

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: ${(props) => props.theme.colors.text};
    border-radius: 20px;

    th, td {
        padding: 15px;
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

    a {
        color: ${(props) => props.theme.colors.textLink};
        text-decoration: none;
    }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: sticky;
  bottom: 0; /* Asegura que se quede en el fondo del contenedor */
  background-color: red;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.darkGray};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.sizes.textFontSize};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;