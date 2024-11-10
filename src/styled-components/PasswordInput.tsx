import styled from "styled-components";

export const PasswordInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    @media (max-width: 768px) {
        width: 516px;
    }

    @media (max-width: 480px) {
        width: 355px;
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