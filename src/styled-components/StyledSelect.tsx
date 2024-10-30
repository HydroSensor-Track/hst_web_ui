import Select from 'react-select'; // Import react-select
import styled from 'styled-components'; // Import styled-components

// Styled Select component using react-select
const StyledSelect = styled(Select)`
    .custom-select__control {
        background-color: ${props => props.theme.colors.mediumGray};
        border: 1px solid ${props => props.theme.colors.gray};
        box-shadow: none;
        &:hover {
            border-color: #007bff;
        }
    }

    .custom-select__multi-value {
        background-color: ${props => props.theme.colors.sideBarBackground};
    }

    .custom-select__multi-value__label {
        color: ${props => props.theme.colors.text};
        font-weight: bold;
    }

    .custom-select__multi-value__remove {
        background-color: transparent;
        color: ${props => props.theme.colors.text};
        &:hover {
            background-color: ${props => props.theme.colors.primary};
            color: white;
        }
    }

    .custom-select__option {
        color:${props => props.theme.colors.text2};
        background-color: ${props => props.theme.colors.background2};
        &:hover {
            background-color: ${props => props.theme.colors.primary};
        }
    }

    .custom-select__option--is-selected {
        background-color: #007bff;
        color: white;
    }
`;

export default StyledSelect;


