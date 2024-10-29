import { DefaultTheme } from 'styled-components';

const dataTableStyles = (theme: DefaultTheme) => ({
    '--DataGrid-containerBackground': theme.colors.headerBackground,
    color: theme.colors.text,
    '& .MuiDataGrid-toolbarContainer': {
        backgroundColor: theme.colors.searchBackground,
        flexDirection: 'row-reverse',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
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
    '& .MuiTablePagination-root': {
        color: theme.colors.text,
        '@media (max-width: 768px)': {
            fontSize: '0.75rem',
        },
    },
    '& .MuiTablePagination-actions': {
        '& .MuiIconButton-root.Mui-disabled': {
            color: theme.colors.buttonDisabled,
        }
    },
    '& .MuiDataGrid-booleanCell[data-value="false"]': {
        color: theme.colors.textLight,
    },
    '& .MuiDataGrid-booleanCell[data-value="true"]': {
        color: theme.colors.text,
    },
    '& .MuiButtonBase-root.MuiCheckbox-root': {
        color: theme.colors.text,
    },
    '@media (max-width: 768px)': {
        '& .MuiDataGrid-columnHeaders': {
            display: 'none',
        },
        '& .MuiDataGrid-cell': {
            fontSize: '0.75rem',
        },
        '& .MuiDataGrid-virtualScroller': {
            paddingBottom: '20px',
        },
    },
    '& .MuiDataGrid-virtualScroller': {
        overflowX: 'auto',
    },
    '& .MuiDataGrid-scrollbar--horizontal': {
        '&::-webkit-scrollbar': {
            height: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colors.searchBackground,
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.colors.textLight,
        },
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
});

export default dataTableStyles;