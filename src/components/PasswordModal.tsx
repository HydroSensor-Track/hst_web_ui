import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import Modal from "./Modal";
import PasswordInput from "./PasswordInput";
import {
    ModalItem,
    ModalLabel,
    ModalTextError
} from "../styled-components/Modal";
import { isValidPassword } from "../utils/functions";

interface PasswordErrors {
    passwordError: string | undefined;
    confirmPasswordError: string | undefined;
}

type PasswordModalProps = {
    setOpen: (open: boolean) => void;
};

const PasswordModal = ({ setOpen }: PasswordModalProps) => {
    const { t } = useTranslation();

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
        passwordError: undefined,
        confirmPasswordError: undefined
    });

    const [canSubmit, setCanSubmit] = useState(false);
    const [open, setOpenModal] = useState(true);

    const setStateProperty = (property: string, value: any) => {
        setPasswords(prevState => ({
            ...prevState,
            [property]: value
        }));
    };

    const noEmptyFields = () => {
        return passwords.password !== '' && passwords.confirmPassword !== '';
    };

    const notErrors = () => {
        return passwordErrors.passwordError === undefined && passwordErrors.confirmPasswordError === undefined;
    };

    const validatePasswords = () => {
        let passwordError = undefined;
        let confirmPasswordError = undefined;

        if (!isValidPassword(passwords.password)) {
            passwordError = 'invalidPassword';
        }

        if (passwords.password !== passwords.confirmPassword) {
            confirmPasswordError = 'passwordsDoNotMatch';
        }

        setPasswordErrors(prevState => ({
            ...prevState,
            passwordError,
            confirmPasswordError
        }));
    };

    const handleClose = () => {
        setOpenModal(false);
        setOpen(false);
    }

    const handleSubmit = () => {
        console.log("Password: ", passwords.password);
        setOpen(false);
    };

    useEffect(() => {
        validatePasswords();
    }, [passwords]);

    useEffect(() => {
        setCanSubmit(() => {
            return noEmptyFields() && notErrors();
        });
    }, [passwordErrors]);

    return (
        <Modal
            title="changePassword"
            onClose={handleClose}
            onSubmit={handleSubmit}
            isOpen={open}
            canSubmit={canSubmit}
        >
            <ModalItem>
                <ModalLabel>{t('passwordHeader')}</ModalLabel>
                <PasswordInput
                    placeholder={t('enterPassword')}
                    onChange={(value) => setStateProperty('password', value)}
                />
                {passwordErrors.passwordError && <ModalTextError>{t(passwordErrors.passwordError)}</ModalTextError>}
            </ModalItem>
            <ModalItem>
                <ModalLabel>{t('confirmPasswordHeader')}</ModalLabel>
                <PasswordInput
                    placeholder={t('enterPassword')}
                    onChange={(value) => setStateProperty('confirmPassword', value)}
                />
                {passwordErrors.confirmPasswordError && <ModalTextError>{t(passwordErrors.confirmPasswordError)}</ModalTextError>}
            </ModalItem>
        </Modal>
    );
};

export default PasswordModal;