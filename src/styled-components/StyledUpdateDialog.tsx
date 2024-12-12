import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from "styled-components";

// Styled Material-UI components
const StyledFormControl = styled(FormControl)``;

const StyledInputLabel = styled(InputLabel)`
    &.MuiInputLabel-root {
        color: ${(props) => props.theme.colors.textLight};
    }
    &.Mui-focused {
        color: ${(props) => props.theme.colors.primary};
    }
`;

const StyledMuiSelect = styled(Select)`
    &.MuiSelect-root {
        background-color: ${(props) => props.theme.colors.darkGray};
        color: ${(props) => props.theme.colors.text};
    }

    .MuiSelect-select {
        background-color: ${(props) => props.theme.colors.mediumGray};
        border-radius: 4px;
        color: ${(props) => props.theme.colors.text};
    }

    .MuiSelect-icon {
        color: ${(props) => props.theme.colors.text};
    }
`;

const StyledMenuItem = styled(MenuItem)`
    &.MuiMenuItem-root {
        background-color: ${(props) => props.theme.colors.mediumGray};
        color: ${(props) => props.theme.colors.text};

        &:hover {
            background-color: ${(props) => props.theme.colors.secondary};
            color: ${(props) => props.theme.colors.text};
        }
    }

    &.Mui-selected {
        background-color: ${(props) => props.theme.colors.primary} !important;
        color: ${(props) => props.theme.colors.text} !important;
    }

    &.Mui-focusVisible {
        background-color: ${(props) => props.theme.colors.accent};
    }
`;

export default function StyledSelectComponent({ label, value, onChange, options, disabled }) {
    const theme = useTheme(); // Use the theme to get the colors

    return (
        <StyledFormControl fullWidth variant="outlined">
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledMuiSelect
                value={value}
                onChange={onChange}
                label={label}
                disabled={disabled}
                MenuProps={{
                    PaperProps: {
                        style: {
                            backgroundColor: theme.colors.mediumGray,
                            color: theme.colors.text,
                        },
                    },
                }}
            >
                {options.map((option) => {
                    // Verificar si la opción es un objeto con clave-valor
                    if (typeof option === "object" && option !== null && "value" in option && "label" in option) {
                        return (
                            <StyledMenuItem key={option.value} value={option.value}>
                                {option.label}
                            </StyledMenuItem>
                        );
                    }

                    // Si no, asumir que es una cadena
                    return (
                        <StyledMenuItem key={option} value={option}>
                            {option}
                        </StyledMenuItem>
                    );
                })}
            </StyledMuiSelect>
        </StyledFormControl>
    );
}
