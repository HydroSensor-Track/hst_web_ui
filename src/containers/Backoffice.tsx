import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import DataTable from "../components/DataTable.tsx";
import {
    BackofficeContainer
} from "../styled-components/Backoffice.tsx";
import { AvatarImg, ActionMenu, AccountCircleRoundedIconStyle } from "../styled-components/StyledDataTable";
import Icon from "../components/Icon.tsx";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: "img",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => {
            return (
                <>
                    {params.row.img ? (
                        <AvatarImg
                            src={params.row.img}
                            alt=""
                        />
                    ) : (
                        <AccountCircleRoundedIconStyle>
                            <Icon name="accountAvatar" />
                        </AccountCircleRoundedIconStyle>
                    )}
                </>
            );
        },
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    { field: 'status', headerName: 'Status', width: 100, type: 'boolean' },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (_value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'action', headerName: 'Action', width: 200, renderCell: (_params) => {
            return (
                <ActionMenu>
                    <Link to={``}>
                        <Icon name="edit" />
                    </Link>
                    <div>
                        <Icon name="delete" />
                    </div>
                </ActionMenu>
            )
        },
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, status: true, img: "https://s.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fad.png" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, img: "https://s.gravatar.com/avatar/16a349ac962d8c9fd4f52fe37f447cb3?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const Backoffice = () => {
    return (
        <BackofficeContainer>
            <DataTable columns={columns} rows={rows} />
        </BackofficeContainer >
    )
}


export default Backoffice;