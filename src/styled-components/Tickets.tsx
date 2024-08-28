import styled from "styled-components";

export const TicketsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
`;

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    gap: 10px;
`;

export const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.darkGray};
    
`;

export const TicketsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: ${(props) => props.theme.colors.text};

    th, td {
        padding: 15px;
        text-align: left;
    }

    th {
        background-color: ${(props) => props.theme.colors.darkGray};
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