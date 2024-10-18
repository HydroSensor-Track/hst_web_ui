import { DataGrid, GridCallbackDetails, GridColDef, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";

import { useTheme } from "styled-components";

import dataTableStyles from '../mui-styles/dataTableStyles';

type Props = {
    columns: GridColDef[];
    rows: object[];
}

const DataTable = ({ columns, rows }: Props) => {
    /**
     * TODO: improve screen sizes for responsive design
     * select multiple rows and enable delete button on top bar for delete multiple users
     */
    const { t } = useTranslation();
    const theme = useTheme();

    const handleSelectionChange = (selection: GridRowSelectionModel, details: GridCallbackDetails) => {
        console.log('Selected rows:', selection);
        console.log('Details:', details);
        console.log("getRow: ", details.api.getRow(selection[0]));
    };

    return (
        <DataGrid
            rows={rows}
            columns={columns}
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
                        img: false,
                        userName: false,
                        createdAt: false,
                        updatedAt: false,
                        lastPasswordReset: false,
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
            onRowSelectionModelChange={handleSelectionChange}
            sx={dataTableStyles(theme)}
        />
    )
}

export default DataTable;