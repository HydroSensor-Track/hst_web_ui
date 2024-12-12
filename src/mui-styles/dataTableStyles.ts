import { DefaultTheme } from 'styled-components';

const dataTableStyles = (theme: DefaultTheme) => ({
    '--DataGrid-containerBackground': theme.colors.componentBackground,
    color: theme.colors.text,
    '& .MuiTablePagination-root': {
        color: theme.colors.text,
        '@media (max-width: 768px)': {
            fontSize: '0.75rem',
        },
    },
    '& .MuiFormControl-root.MuiTextField-root.MuiDataGrid-toolbarQuickFilter': {
        color: theme.colors.text,
        '& .MuiInputBase-root': {
            color: theme.colors.text,
        },
        '& .MuiInputLabel-root': {
            color: theme.colors.text,
        },
        '& .MuiIconButton-root': {
            color: theme.colors.text,
        },
        '@media (max-width: 768px)': {
            width: '100%',
        },
    },
});

export default dataTableStyles;
