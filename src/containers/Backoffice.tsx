import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import DataTable from "../components/DataTable";
import { BackofficeContainer } from "../styled-components/Backoffice";
import { AvatarImg, ActionMenu, AccountCircleRoundedIconStyle } from "../styled-components/StyledDataTable";
import Icon from "../components/Icon.tsx";
import AddUserModal from "../components/AddUserModal";
import { useModal } from "../contexts/ModalContext";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: "img",
        headerName: "Avatar",
        width: 80,
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
        headerName: 'Nombre',
        width: 150,
        headerAlign: 'center',
    },
    {
        field: 'lastName',
        headerName: 'Apellido',
        width: 150,
        headerAlign: 'center',
    },
    {
        field: 'email',
        headerName: 'Correo electrónico',
        width: 200,
        headerAlign: 'center',
    },
    { field: 'status', headerName: 'Verificado', width: 100, type: 'boolean', align: 'center' },
    {
        field: 'userName',
        headerName: 'Nombre de usuario',
        width: 150,
    },
    {
        field: 'createdAt',
        headerName: 'Creado',
        width: 200,
    },
    {
        field: 'updatedAt',
        headerName: 'Actualizado',
        width: 200,
    },
    {
        field: 'lastPasswordReset',
        headerName: 'Contraseña actualizada',
        width: 200,
    },
    {
        field: 'lastLogin',
        headerName: 'Última sesión',
        width: 200,
        headerAlign: 'center',
    },
    {
        field: 'action', headerName: 'Acción', width: 80, headerAlign: 'center', renderCell: (params) => {
            return (
                <ActionMenu>
                    <Link to={`/users/${params.row.id}`}>
                        <Icon name="edit" />
                    </Link>
                    <div style={{ "cursor": "pointer" }}>
                        <Icon name="delete" />
                    </div>
                </ActionMenu>
            )
        },
    },
];

const rows = [
    { id: "1sdsdfsf3sfsfsf8fsffs", lastName: 'Snow', firstName: 'Jon', userName: 'jsnow', createdAt: "2024-07-09T20:42:16.776", updatedAt: "2024-09-29T22:09:40.959", lastLogin: "2024-09-30T18:09:40.959", status: true, img: "https://s.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fad.png", email: "jsnow@ina.gov.ar", lastPasswordReset: null },
    { id: "2sdsdfsf3sfsfsf8fsffs", lastName: 'Lannister', firstName: 'Cersei', userName: 'clannister', createdAt: "2024-09-21T17:52:18.64", updatedAt: "2024-09-22T03:47:00.602", img: "https://s.gravatar.com/avatar/16a349ac962d8c9fd4f52fe37f447cb3?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png", email: "clannister@ina.gov.ar", lastPasswordReset: null },
    { id: "3sdsdfsf3sfsfsf8fsffs", lastName: 'Lannister', firstName: 'Jaime', userName: 'jlannister', createdAt: "2024-09-16T23:23:40.984", updatedAt: "2024-09-21T17:40:04.973", email: "jlannister@ina.gov.ar", lastPasswordReset: "2024-09-20T04:56:36.222" },
    { id: "4sdsdfsf3sfsfsf8fsffs", lastName: 'Stark', firstName: 'Arya', userName: 'astark', createdAt: "2024-09-16T23:23:40.984", updatedAt: "2024-09-21T17:40:04.973", email: "astark@ina.gov.ar", lastPasswordReset: "2024-09-21T17:40:04.966" },
];

const Backoffice = () => {
    const { openModal, updateOpenModal } = useModal();

    return (
        <BackofficeContainer>
            <DataTable columns={columns} rows={rows} />
            {openModal && <AddUserModal setOpen={updateOpenModal} />}
        </BackofficeContainer >
    )
}


export default Backoffice;