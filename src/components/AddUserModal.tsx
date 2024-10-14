import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';

import {
    ModalLabel,
    ModalTextError,
    ModalItem
} from "../styled-components/Modal";
import Modal from "./Modal";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";

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

    const [errors, setErrors] = useState<AddUserErrors>({
        emailError: undefined,
        userNameError: undefined,
        passwordError: undefined,
        confirmPasswordError: undefined
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
        console.log("Mail: ", editableFields.email);
        console.log("User name: ", editableFields.userName);
        console.log("Password: ", editableFields.password);
        console.log("Frist name: ", editableFields.firstName);
        console.log("Last name: ", editableFields.lastName);
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

    /*
    TODO: react input disable hide text in password
    make modal responsive
    */

    return (
        <Modal
            title='addNewUser'
            onClose={handleClose}
            onSubmit={handleSubmit}
            isOpen={open}
            canSubmit={canSubmit}
        >
            <ModalItem>
                <ModalLabel>{t('emailHeader')}</ModalLabel>
                <TextInput
                    type="email"
                    placeholder={t('enterEmail')}
                    onChange={(value) => setStateProperty('email', value)}
                />
                {errors.emailError && <ModalTextError>{t(errors.emailError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('userNameHeader')}</ModalLabel>
                <TextInput
                    type="string"
                    placeholder={t('enterUserName')}
                    onChange={(value) => setStateProperty('userName', value)}
                />
                {errors.userNameError && <ModalTextError>{t(errors.userNameError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('passwordHeader')}</ModalLabel>
                <PasswordInput
                    placeholder={t('enterPassword')}
                    onChange={(value) => setStateProperty('password', value)}
                />
                {errors.passwordError && <ModalTextError>{t(errors.passwordError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('confirmPasswordHeader')}</ModalLabel>
                <PasswordInput
                    placeholder={t('enterPassword')}
                    onChange={(value) => setStateProperty('confirmPassword', value)}
                />
                {errors.confirmPasswordError && <ModalTextError>{t(errors.confirmPasswordError)}</ModalTextError>}
            </ModalItem>
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
        </Modal>
    );
}

export default AddUserModal;