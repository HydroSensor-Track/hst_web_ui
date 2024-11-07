import styled from 'styled-components';
import {
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  Dialog,
} from '@mui/material';

// Styled Dialog component
export const StyledDialog = styled(Dialog)`
    color: #FFFFFF !important; /* Force white text */
    .MuiDialog-paper {
        background-color: ${(props) => props.theme.colors.darkGray};
        color: #FFFFFF !important; /* Force white text */
    }
`;

// Styled TextField
export const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    .MuiInputBase-root {
      background-color: ${(props) => props.theme.colors.mediumGray};
      color: ${(props) => props.theme.colors.text} !important;
    }

    .MuiInputBase-input {
      color: ${(props) => props.theme.colors.text} !important;
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.colors.border};  /* Add border color */
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.colors.primary};  /* Focus border color */
    }

    .MuiFormLabel-root {
      color: ${(props) => props.theme.colors.textLight} !important; /* Placeholder text color */
    }

    .MuiFormLabel-root.Mui-focused {
      color: ${(props) => props.theme.colors.primary} !important; /* Label color when focused */
    }
  }
`;

// Styled Button
export const StyledButton = styled(Button)`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text} !important;
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
        background-color: ${(props) => props.theme.colors.background2};
        color: ${(props) => props.theme.colors.text} !important;  
    }

    .Mui-focused .MuiInputLabel-root {
        color: ${(props) => props.theme.colors.text} !important; 
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${(props) => props.theme.colors.primary};  /* Focus border color */
    }
`;

// Styled RadioGroup
export const StyledRadioGroup = styled(RadioGroup)`
    .MuiFormControlLabel-label {
        color: ${(props) => props.theme.colors.text} !important;
    }
`;

// Styled Radio
export const StyledRadio = styled(Radio)`
    color: ${(props) => props.theme.colors.text} !important;
    &.Mui-checked {
        color: ${(props) => props.theme.colors.primary};
    }
`;
