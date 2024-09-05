import styled from "styled-components";

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
      padding: 15px;
      text-align: center;
      font-size: ${(props) => props.theme.sizes.textFontSize};
      width: ${(props) => props.columnWidth}%;
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
  align-items: center;
  height: 10%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  height:60%;
`;