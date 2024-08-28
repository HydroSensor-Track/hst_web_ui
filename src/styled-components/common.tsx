import styled from 'styled-components';

export const CenteredDiv = styled.div<{$column?:boolean}>`
    display: flex;
    flex-direction: ${props => props.$column ? 'column' : 'row'};
    align-items: center;
    justify-content: center;
`;

export const StyledLoading = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;


