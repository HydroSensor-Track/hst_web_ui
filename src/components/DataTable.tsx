import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";

import { useTheme } from "styled-components";

type Props = {
    columns: GridColDef[];
    rows: object[];
}

const DataTable = (props: Props) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <DataGrid
            rows={props.rows}
            columns={props.columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
                columns: {
                    columnVisibilityModel: {
                        // Hide id column, the other columns will remain visible
                        id: false,
                    },
                },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    csvOptions: { disableToolbarButton: true },
                    printOptions: { disableToolbarButton: true },
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
            }}
            localeText={{ toolbarQuickFilterPlaceholder: t('search') }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            density='standard'// confortable, compact, standard
            sx={{
                '--DataGrid-containerBackground': theme.colors.headerBackground,
                color: theme.colors.text,
                '& .MuiDataGrid-toolbarContainer': {
                    backgroundColor: theme.colors.searchBackground,
                    flexDirection: 'row-reverse',
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
                    }
                },
                '& .MuiTablePagination-root': {
                    color: theme.colors.text,
                },
                '& .MuiTablePagination-actions': {
                    '& .MuiIconButton-root.Mui-disabled': {
                        color: theme.colors.buttonDisabled,
                    }
                },
                '& .MuiDataGrid-booleanCell[data-value="false"]': {
                    color: theme.colors.buttonDisabled,
                },
                '& .MuiDataGrid-booleanCell[data-value="true"]': {
                    color: theme.colors.text,
                },
                '& .MuiButtonBase-root.MuiCheckbox-root': {
                    color: theme.colors.text,
                },
            }}
        />
    )
}

export default DataTable;