import { DefaultTheme } from 'styled-components';

export const dialogStyles = (theme: DefaultTheme) => ({
    '& .MuiDialog-paper': {
        backgroundColor: theme.colors.componentBackground,
        color: theme.colors.text,
    },
});

export const textFieldStyles = (theme: DefaultTheme) => ({
    '& .MuiInputBase-input': {
        color: theme.colors.text,
    },
    '& .MuiInputLabel-root': {
        color: theme.colors.text,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.colors.border, // Default border color
        },
        '&:hover fieldset': {
            borderColor: theme.colors.border, // Border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.colors.primary, // Border color when focused
        },
    },
});