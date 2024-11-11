import styled from "styled-components";

const Logo = styled.img`
    width: 100px;
    margin: 10px;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.colors.text};

    @media (max-width: 768px) {
        display: none;
    }
`;

export { Logo, Title };