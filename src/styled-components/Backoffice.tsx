import styled from "styled-components";

export const BackofficeContainer = styled.div`
    background-color: ${(props) => props.theme.colors.componentBackground};
    width: 100%;
    overflow-x: auto;
    margin: 0 auto;
    max-width: 100%;

    @media (min-width: 310px) {
        max-width: 310px;
    }
    @media (min-width: 600px) {
        max-width: 600px;
    }
    @media (min-width: 960px) {
        max-width: 960px;
    }
    @media (min-width: 1280px) {
        max-width: 1280px;
    }
    @media (min-width: 1440px) {
        max-width: 1440px;
    }
`;

export const ErrorMessage = styled.p`
    color: ${(props) => props.theme.colors.error};
`;