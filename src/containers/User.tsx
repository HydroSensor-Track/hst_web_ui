import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";

import UserCard from '../components/UserCard';
import { isValidEmail, isValidUserName, transformUserCompleteInfoToUserInfo } from "../utils/functions";
import PasswordModal from '../components/PasswordModal';
import { useModal } from "../contexts/ModalContext";
import { UserInfo } from '../interfaces/userInfo';
import EditFieldDialog from '../components/EditFieldDialog';
import { getCardDataPropsList } from '../utils/data.ts';
import { RootState, AppDispatch } from "../redux/store.ts";
import { UpdateUserParams } from "../interfaces/redux.ts";
import { getUser, updateUserById } from "../redux/reducers/usersSlice.ts";
import Loading from '../components/Loading.tsx';

const User: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { openModal, updateOpenModal } = useModal();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.users);

    const [userInfo, setUserInfo] = useState<UserInfo>(transformUserCompleteInfoToUserInfo(user));
    const cardDataPropsList = getCardDataPropsList(userInfo);

    const [open, setOpen] = useState(false);
    const [editableField, setEditableField] = useState<Partial<UserInfo>>({});
    const [errors, setErrors] = useState<{ [key in keyof UserInfo]?: string }>({});
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleEditClick = (field: keyof UserInfo) => {
        setEditableField({ [field]: userInfo[field] });
        setOpen(true);
    };

    const handleClose = () => {
        console.log("User ID: ", id);
        setOpen(false);
        setErrors({});
    };

    const handleSave = () => {
        setUserInfo({ ...userInfo, ...editableField });
        const editableFieldKey = Object.keys(editableField)[0] as keyof UserInfo;

        let data: UpdateUserParams = {}
        if (editableFieldKey === 'firstName') {
            data = {
                user_metadata: {
                    "frist_name": editableField[editableFieldKey] ?? ''
                }
            };
        } else if (editableFieldKey === 'lastName') {
            data = {
                user_metadata: {
                    "last_name": editableField[editableFieldKey] ?? ''
                }
            };
        } else if (editableFieldKey === 'userName') {
            data = {
                "username": editableField[editableFieldKey] ?? ''
            };
        } else if (editableFieldKey === 'email') {
            data = {
                "email": editableField[editableFieldKey] ?? '',
                "verify_email": true
            };
        } else {
            data = { [editableFieldKey]: editableField[editableFieldKey] };
        }

        dispatch(updateUserById({ id, data }));
        setOpen(false);
    };

    const validateInput = () => {
        const editableFieldKey = Object.keys(editableField)[0] as keyof UserInfo;
        const currentError = errors[editableFieldKey];
        const noErrors = currentError === null;

        const hasChanges = Object.keys(editableField).some(
            (field) => userInfo[field as keyof UserInfo] !== editableField[field as keyof UserInfo]
        );

        if (hasChanges && noErrors) {
            setDisabled(false);
            return;
        }

        let error: string = t('differentInput');
        setErrors((prev) => ({ ...prev, [editableFieldKey]: error }));
        setDisabled(true);

        if (currentError && currentError !== error) {
            setErrors((prev) => ({ ...prev, [editableFieldKey]: currentError }));
        }
    }

    const handleChange = (field: keyof UserInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEditableField((prev) => ({ ...prev, [field]: value }));

        let error: string | null = null;
        setDisabled(false);
        if (field === 'email' && !isValidEmail(value)) {
            error = t('invalidEmail');
            setDisabled(true);
        } else if (field === 'userName' && !isValidUserName(value)) {
            error = t('invalidUserName');
            setDisabled(true);
        } else if ((field === 'firstName' && value === '') || (field === 'lastName' && value === '')) {
            error = t('fieldDoesNotEmpty');
            setDisabled(true);
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    useEffect(() => {
        dispatch(getUser(id));
    }, []);

    useEffect(() => {
        setUserInfo(transformUserCompleteInfoToUserInfo(user));
    }, [user]);

    useEffect(() => {
        validateInput();
    }, [open, editableField])

    return (
        loading ?
            <Loading />
            :
            <Box p={5}>
                {openModal && <PasswordModal setOpen={updateOpenModal} id={id} />}
                {cardDataPropsList.map(cardDataProps => {
                    return (
                        <UserCard
                            key={cardDataProps.key}
                            title={cardDataProps.title}
                            value={cardDataProps.value}
                            field={cardDataProps.field as keyof UserInfo}
                            showHeader={cardDataProps.showHeader}
                            userInfo={userInfo}
                            handleEditClick={handleEditClick}
                        />
                    )
                })}

                <EditFieldDialog
                    open={open}
                    title="Edit Information"
                    handleClose={handleClose}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    editableField={editableField}
                    errors={errors}
                    disabled={disabled} />
            </Box>
    );
};

export default User;
