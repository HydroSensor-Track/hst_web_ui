import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserCard from '../components/UserCard';
import { isValidEmail, isValidUserName } from "../utils/functions";
import PasswordModal from '../components/PasswordModal';
import { useModal } from "../contexts/ModalContext";
import UserInfo from '../interfaces/userInfo';
import EditFieldDialog from '../components/EditFieldDialog';
import { getCardDataPropsList } from '../utils/data.ts';

const User: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const { openModal, updateOpenModal } = useModal();

    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userName: 'johndoe',
        emailVerified: true,
        lastLogin: '2023-10-01T12:34:56Z',
        lastPasswordReset: '2023-09-15T12:34:56Z',
        updatedAt: '2023-10-01T12:34:56Z',
        createdAt: '2023-01-01T12:34:56Z',
    });
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
        validateInput();
    }, [open, editableField])

    return (
        <Box p={5}>
            {openModal && <PasswordModal setOpen={updateOpenModal} />}
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
