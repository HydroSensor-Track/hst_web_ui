import styled from 'styled-components';
import { TextField, Button, RadioGroup, Radio, FormControl, Dialog } from '@mui/material';
import { Select, InputLabel, MenuItem } from '@mui/material';
import { useTheme } from "styled-components";

// Styled Dialog component
export const StyledDialog = styled(Dialog)`
    color: #FFFFFF !important; /* Force white text */
    margin: 0px;
    .MuiDialog-paper {
        background-color: ${(props) => props.theme.colors.text};
        margin: 0px;
        color: #FFFFFF !important; /* Force white text */
    }
`;

// Styled TextField
export const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    .MuiInputBase-root {
      background-color: ${(props) => props.theme.colors.text};
      color: ${(props) => props.theme.colors.darkGray} !important;
    }

    .MuiInputBase-input {
      color: ${(props) => props.theme.colors.darkGray} !important;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.colors.darkGray};  /* Add border color */
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.colors.darkGray};  /* Focus border color */
    }

    .MuiFormLabel-root {
      color: ${(props) => props.theme.colors.darkGray} !important; /* Placeholder text color */
    }

    .MuiFormLabel-root.Mui-focused {
      color: ${(props) => props.theme.colors.darkGray} !important; /* Label color when focused */
    }

  }
`;

// Styled Button
export const StyledButton = styled(Button)`
    background-color: ${(props) => props.theme.colors.primary};

    font-size: ${(props) => props.theme.sizes.buttonFontSize};
    &:hover {
        background-color: ${(props) => props.theme.colors.primaryFaded};
    }
    &:disabled {
        background-color: ${(props) => props.theme.colors.buttonDisabled};
        color: ${(props) => props.theme.colors.text_faded};
    }
`;

// Styled FormControl for Select
export const StyledFormControl = styled(FormControl)`
    .MuiInputBase-root {
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.darkGray} !important;
    }
    .MuiOutlinedInput-root {
        min-height: 10px; /* Define una altura mínima */
    }

    .Mui-focused .MuiInputLabel-root {
        color: ${(props) => props.theme.colors.darkGray} !important;
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${(props) => props.theme.colors.darkGray};  /* Focus border color */
    }
`;

// Styled RadioGroup
export const StyledRadioGroup = styled(RadioGroup)`
    .MuiFormControlLabel-label {
        color: ${(props) => props.theme.colors.darkGray} !important;
    }
`;

// Styled Radio
export const StyledRadio = styled(Radio)`
    &.Mui-checked {
        color: ${(props) => props.theme.colors.primary};
    }
`;

const StyledInputLabel = styled(InputLabel)`
    &.MuiInputLabel-root {
        color: ${(props) => props.disabled ? '#0e1920' : props.theme.colors.darkGray} !important;
    }
    &.Mui-focused {
        color: ${(props) => props.theme.colors.text};
    }

`;

const StyledMuiSelect = styled(Select)`
    &.MuiSelect-root {
        background-color: ${(props) => props.theme.colors.text};
        color: ${(props) => props.theme.colors.text};
    }

    .MuiSelect-select {
        background-color: ${(props) => props.theme.colors.text};
        border-radius: 4px;
        color: ${(props) => (props.disabled ? '#0e1920' : props.theme.colors.darkGray)};
        font-style: ${(props) => (props.disabled ? 'italic' : 'normal')};
    }

    .MuiOutlinedInput-notchedOutline {
        border-color:   ${(props) => props.disabled ? '#0e1920' : props.theme.colors.darkGray} !important;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
        border-color:   ${(props) => props.disabled ? '#0e1920' : props.theme.colors.darkGray} !important;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color:   ${(props) => props.disabled ? '#0e1920' : props.theme.colors.darkGray} !important;
    }

    .MuiSelect-icon {
        color: ${(props) => props.theme.colors.darkGray};
    }
`;

const StyledMenuItem = styled(MenuItem)`
    &.MuiMenuItem-root {
        background-color: ${(props) => props.theme.colors.darkSideBarBackground};
        color: ${(props) => props.theme.colors.text};

        &:hover {
            background-color: ${(props) => props.theme.colors.secondary};
            color: ${(props) => props.theme.colors.text};
        }
    }

    &.Mui-selected {
        background-color: ${(props) => props.theme.colors.primary} !important;
        color: ${(props) => props.theme.colors.dark} !important;
    }

    &.Mui-focusVisible {
        background-color: ${(props) => props.theme.colors.accent};
    }
`;

export function StyledSelectComponent({ label, value, onChange, options, disabled }) {
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
