import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import DataTable from "../components/DataTable";
import { BackofficeContainer } from "../styled-components/Backoffice";
import { ActionMenu } from "../styled-components/StyledDataTable";
import Icon from "../components/Icon.tsx";
import AddUserModal from "../components/AddUserModal";
import { useModal } from "../contexts/ModalContext";
import { RootState, AppDispatch } from "../redux/store.ts";
import { getUsersList } from "../redux/reducers/usersSlice.ts";
import { DataGridUserInfo } from "../interfaces/userInfo.ts";
import Loading from '../components/Loading.tsx';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
    { field: 'emailVerified', headerName: 'Verificado', width: 100, type: 'boolean', align: 'center' },
    {
        field: 'userName',
        headerName: 'Nombre de usuario',
        width: 150,
    },
    {
        field: 'createdAt',
        headerName: 'Creado',
        width: 200,
        type: 'dateTime',
    },
    {
        field: 'updatedAt',
        headerName: 'Actualizado',
        width: 200,
        type: 'dateTime',
    },
    {
        field: 'lastPasswordReset',
        headerName: 'Contraseña actualizada',
        width: 200,
        type: 'dateTime',
    },
    {
        field: 'lastLogin',
        headerName: 'Última sesión',
        width: 200,
        headerAlign: 'center',
        type: 'dateTime',
        valueGetter: (params) => params ? new Date(params) : null,
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

const Backoffice = () => {
    const { openModal, updateOpenModal } = useModal();
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading } = useSelector((state: RootState) => state.users);

    const rows: DataGridUserInfo[] = users.map(({ user_metadata, username, ...user }) => ({
        ...user,
        userName: username,
        id: user.userId.split('|')[1],
        firstName: user_metadata?.first_name || '',
        lastName: user_metadata?.last_name || '',
    }));

    useEffect(() => {
        dispatch(getUsersList());
    }, []);

    return (
        loading ? <Loading />
            :
            <BackofficeContainer>
                <DataTable columns={columns} rows={rows} />
                {openModal && <AddUserModal setOpen={updateOpenModal} />}
            </BackofficeContainer >
    )
}


export default Backoffice;