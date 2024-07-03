import styled from 'styled-components';

export const CenteredDiv = styled.div<{column:boolean}>`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    align-items: center;
    justify-content: center;
`;


