import { GridColDef } from '@mui/x-data-grid';
import { TFunction } from "i18next";

export const getColumns = (t: TFunction<"translation", undefined>): GridColDef[] => {
    return [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: t('firstNameHeader'),
            width: 200,
            headerAlign: 'center',
        },
        {
            field: 'lastName',
            headerName: t('lastNameHeader'),
            width: 200,
            headerAlign: 'center',
        },
        {
            field: 'email',
            headerName: t('emailHeader'),
            width: 300,
            headerAlign: 'center',
        },
        {
            field: 'userName',
            headerName: t('userName'),
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: t('created'),
            width: 200,
            type: 'dateTime',
        },
        {
            field: 'updatedAt',
            headerName: t('updated'),
            width: 200,
            type: 'dateTime',
        },
        {
            field: 'lastPasswordReset',
            headerName: t('passwordReseted'),
            width: 200,
            type: 'dateTime',
        },
        {
            field: 'lastLogin',
            headerName: t('lastLoginHeader'),
            width: 200,
            headerAlign: 'center',
            type: 'dateTime',
            valueGetter: (params) => params ? new Date(params) : null,
        },
    ];
};