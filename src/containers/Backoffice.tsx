import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import DataTable from "../components/DataTable";
import { BackofficeContainer } from "../styled-components/Backoffice";
import { ActionMenu } from "../styled-components/StyledDataTable";
import Icon from "../components/Icon.tsx";
import AddUserModal from "../components/AddUserModal";
import { useModal } from "../contexts/ModalContext";
import { RootState, AppDispatch } from "../redux/store.ts";
import { getUsersList, deleteUserById } from "../redux/reducers/usersSlice.ts";
import { DataGridUserInfo } from "../interfaces/userInfo.ts";
import Loading from '../components/Loading.tsx';
import { getColumns } from '../utils/columns';

const Backoffice = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { openModal, updateOpenModal } = useModal();
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading } = useSelector((state: RootState) => state.users);

    /*
    TODO: display a confirmation dialog before deleting a user
    */
    const handleDelete = (id: string) => {
        dispatch(deleteUserById(id));
    };

    const columns: GridColDef[] = getColumns(t);
    const columnsWithActions: GridColDef[] = [
        ...columns,
        {
            field: 'action',
            headerName: 'Acción',
            width: 100,
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <ActionMenu>
                        <Link to={`/users/${params.row.id}`}>
                            <Icon name="edit" htmlColor={theme.colors.primary} />
                        </Link>
                        <div style={{ cursor: 'pointer' }} onClick={() => handleDelete(params.row.id)}>
                            <Icon name="delete" htmlColor={theme.colors.riskyOperation} />
                        </div>
                    </ActionMenu>
                );
            },
        },
    ];

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
                <DataTable columns={columnsWithActions} rows={rows} />
                {openModal && <AddUserModal setOpen={updateOpenModal} />}
            </BackofficeContainer >
    )
}


export default Backoffice;