import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import {
    ModalLabel,
    ModalTextError,
    ModalItem
} from "../styled-components/Modal";
import Modal from "./Modal";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";
import { AppDispatch } from "../redux/store.ts";
import { newUser } from "../redux/reducers/usersSlice.ts";
import { CreateUserParams } from "../interfaces/redux.ts"

import { isValidEmail, isValidPassword, isValidUserName } from "../utils/functions";

interface AddUserErrors {
    emailError: string | undefined;
    userNameError: string | undefined;
    passwordError: string | undefined;
    confirmPasswordError: string | undefined;
}

type Props = {
    setOpen: (open: boolean) => void;
}

const AddUserModal = ({ setOpen }: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const [errors, setErrors] = useState<AddUserErrors>({
        emailError: undefined,
        userNameError: undefined,
        passwordError: undefined,
        confirmPasswordError: undefined
    });
    const [touchedFields, setTouchedFields] = useState({
        email: false,
        userName: false,
        password: false,
        confirmPassword: false,
    });
    const [editableFields, setEditableFields] = useState({
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const [canSubmit, setCanSubmit] = useState(false);
    const [open, setOpenModal] = useState(true);

    const setStateProperty = (property: string, value: any) => {
        setEditableFields(prevState => ({
            ...prevState,
            [property]: value
        }));
    };

    const handleBlur = (field: string) => {
        setTouchedFields(prevState => ({
            ...prevState,
            [field]: true
        }));
    };

    const noEmptyFields = () => {
        return editableFields.email !== '' && editableFields.userName !== '' && editableFields.password !== '' && editableFields.confirmPassword !== '' && editableFields.firstName !== '' && editableFields.lastName !== '';
    };

    const notErrors = () => {
        return errors.emailError === undefined && errors.userNameError === undefined && errors.passwordError === undefined && errors.confirmPasswordError === undefined;
    };

    const validateSensitiveData = () => {
        let emailError = undefined;
        let userNameError = undefined;
        let passwordError = undefined;
        let confirmPasswordError = undefined;

        if (!isValidEmail(editableFields.email)) {
            emailError = 'invalidEmail';
        }

        if (!isValidUserName(editableFields.userName)) {
            userNameError = 'invalidUserName';
        }

        if (!isValidPassword(editableFields.password)) {
            passwordError = 'invalidPassword';
        }

        if (editableFields.password !== editableFields.confirmPassword) {
            confirmPasswordError = 'passwordsDoNotMatch';
        }

        setErrors(prevState => ({
            ...prevState,
            emailError,
            userNameError,
            passwordError,
            confirmPasswordError
        }));
    }

    const handleClose = () => {
        setOpenModal(false);
        setOpen(false);
    }

    const handleSubmit = () => {
        const newUserParams: CreateUserParams = {
            email: editableFields.email,
            username: editableFields.userName,
            password: editableFields.password,
            connection: 'Username-Password-Authentication',
            user_metadata: {
                first_name: editableFields.firstName,
                last_name: editableFields.lastName
            }
        }
        dispatch(newUser(newUserParams));
        setOpenModal(false);
        setOpen(false);
    }

    useEffect(() => {
        validateSensitiveData()
    }, [editableFields]);

    useEffect(() => {
        setCanSubmit(() => {
            return noEmptyFields() && notErrors();
        });
    }, [errors, editableFields]);


    return (
        <Modal
            title='addNewUser'
            onClose={handleClose}
            onSubmit={handleSubmit}
            isOpen={open}
            canSubmit={canSubmit}
            cancelText={'cancel'}
            submitText={'save'}
        >
            <ModalItem>
                <ModalLabel>{t('firstNameHeader')}</ModalLabel>
                <TextInput
                    type="string"
                    placeholder={t('enterFirstName')}
                    onChange={(value) => setStateProperty('firstName', value)}
                />
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('lastNameHeader')}</ModalLabel>
                <TextInput
                    type="string"
                    placeholder={t('enterLastName')}
                    onChange={(value) => setStateProperty('lastName', value)}
                />
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('emailHeader')}</ModalLabel>
                <TextInput
                    type="email"
                    placeholder={t('enterEmail')}
                    onChange={(value) => setStateProperty('email', value)}
                    onBlur={() => handleBlur('email')}
                />
                {errors.emailError && touchedFields.email && <ModalTextError>{t(errors.emailError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('userNameHeader')}</ModalLabel>
                <TextInput
                    type="string"
                    placeholder={t('enterUserName')}
                    onChange={(value) => setStateProperty('userName', value)}
                    onBlur={() => handleBlur('userName')}
                />
                {errors.userNameError && touchedFields.userName && <ModalTextError>{t(errors.userNameError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('passwordHeader')}</ModalLabel>
                <PasswordInput
                    placeholder={t('enterPassword')}
                    onChange={(value) => setStateProperty('password', value)}
                    onBlur={() => handleBlur('password')}
                />
                {errors.passwordError && touchedFields.password && <ModalTextError>{t(errors.passwordError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('confirmPasswordHeader')}</ModalLabel>
                <PasswordInput
                    placeholder={t('enterPassword')}
                    onChange={(value) => setStateProperty('confirmPassword', value)}
                    onBlur={() => handleBlur('confirmPassword')}
                />
                {errors.confirmPasswordError && touchedFields.confirmPassword && <ModalTextError>{t(errors.confirmPasswordError)}</ModalTextError>}
            </ModalItem>

        </Modal>
    );
}

export default AddUserModal;
