import styled from "styled-components";

export const PasswordInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const PasswordInputIcon = styled.div`
    position: absolute;
    right: 5%;
    cursor: pointer;
    display: flex;

    @media (max-width: 768px) {
        right: 10px;
    }
`;