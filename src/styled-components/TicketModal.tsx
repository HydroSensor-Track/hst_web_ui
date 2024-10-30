import styled from 'styled-components';
import { Dialog, TextField, Button } from '@mui/material';

// Styled Dialog component
export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
`;

// Styled TextField component
export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${(props) => props.theme.colors.mediumGray};
    color: ${(props) => props.theme.colors.text};
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.border};
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.primary};
  }

  .MuiFormLabel-root {
    color: ${(props) => props.theme.colors.textLight};
  }
`;

// Styled Button component
export const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.sizes.buttonFontSize};
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryFaded};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.buttonDisabled};
    color: ${(props) => props.theme.colors.text_faded};
  }
`;