import styled from "styled-components";

export const StyledTable = styled.table`
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