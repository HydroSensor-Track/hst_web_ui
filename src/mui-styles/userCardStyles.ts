import { DefaultTheme } from 'styled-components';

export const cardStyles = (theme: DefaultTheme) => ({
    mb: '16px',
    bgcolor: theme.colors.componentBackground
});

export const cardHeaderStyles = (theme: DefaultTheme, emailVerified: boolean) => ({
    color: emailVerified ? theme.colors.success : theme.colors.error,
    "& .MuiTypography-root": { typography: 'h6' }
});

export const dividerStyles = (theme: DefaultTheme) => ({
    bgcolor: theme.colors.textLight
});

export const cardTypographyHeaderStyles = (theme: DefaultTheme) => ({
    typography: 'p',
    color: theme.colors.text
});

export const cardTypographyContentStyles = (theme: DefaultTheme) => ({
    typography: 'body1',
    color: theme.colors.textLight
});