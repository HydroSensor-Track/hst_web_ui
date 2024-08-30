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
    border-radius: 20px;
    background-color: green;
`;