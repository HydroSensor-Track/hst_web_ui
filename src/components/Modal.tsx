import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalForm,
    ModalLabel,
    ModalTextError,
    ModalItem,
    ModalButtonContainer
} from "../styled-components/Modal";
import Button from "./Button"
import Icon from "./Icon"
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";

import { isValidEmail, isValidPassword, isValidUserName } from "../utils/functions";

type Props = {
    setOpen: (open: boolean) => void;
}

const Modal = (props: Props) => {
    const { t } = useTranslation();
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [userNameError, setUserNameError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const [mail, setMail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);

    const isValidInput = () => {
        return mail !== '' && userName !== '' && password !== '' && firstName !== '' && lastName !== '' && !areErrors();
    }

    const areErrors = () => {
        return emailError !== undefined || userNameError !== undefined || passwordError !== undefined;
    }

    const validateSensitiveData = () => {
        if (!isValidEmail(mail)) setEmailError('invalidEmail');

        else setEmailError(undefined);

        if (!isValidUserName(userName)) setUserNameError('invalidUserName');

        else setUserNameError(undefined);

        if (!isValidPassword(password)) setPasswordError('invalidPassword');

        else setPasswordError(undefined);

        isValidInput() ? setCanSubmit(true) : setCanSubmit(false);
    }

    const handleSubmit = () => {
        if (!isValidEmail(mail)) {
            setEmailError('invalidEmail');
            setCanSubmit(false);
            return;
        }

        if (!isValidUserName(userName)) {
            setUserNameError('invalidUserName');
            setCanSubmit(false);
            return;
        }

        if (!isValidPassword(password)) {
            setPasswordError('invalidPassword');
            setCanSubmit(false);
            return;
        }

        console.log("Mail: ", mail);
        console.log("User name: ", userName);
        console.log("Password: ", password);
        console.log("Frist name: ", firstName);
        console.log("Last name: ", lastName);
        props.setOpen(false)
    }

    useEffect(() => {
        validateSensitiveData()
    }, [mail, userName, password]);

    /*
    TODO: react input disable hide text in password
    make modal responsive and avoid click side bar
    */

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>{t('addNewUser')}</ModalHeader>
                <ModalForm>
                    <ModalItem>
                        <ModalLabel>{t('emailHeader')}</ModalLabel>
                        <TextInput
                            type="email"
                            placeholder={t('enterEmail')}
                            onChange={setMail}
                        />
                        {emailError && <ModalTextError>{t(emailError)}</ModalTextError>}
                    </ModalItem>
                    <ModalItem>
                        <ModalLabel>{t('userNameHeader')}</ModalLabel>
                        <TextInput
                            type="string"
                            placeholder={t('enterUserName')}
                            onChange={setUserName}
                        />
                        {userNameError && <ModalTextError>{t(userNameError)}</ModalTextError>}
                    </ModalItem>
                    <ModalItem>
                        <ModalLabel>{t('passwordHeader')}</ModalLabel>
                        <PasswordInput
                            placeholder={t('enterPassword')}
                            onChange={setPassword}
                        />
                        {passwordError && <ModalTextError>{t(passwordError)}</ModalTextError>}
                    </ModalItem>
                    <ModalItem>
                        <ModalLabel>{t('firstNameHeader')}</ModalLabel>
                        <TextInput
                            type="string"
                            placeholder={t('enterFirstName')}
                            onChange={setFirstName}
                        />
                    </ModalItem>
                    <ModalItem>
                        <ModalLabel>{t('lastNameHeader')}</ModalLabel>
                        <TextInput
                            type="string"
                            placeholder={t('enterLastName')}
                            onChange={setLastName}
                        />
                    </ModalItem>
                </ModalForm>
                <ModalButtonContainer>
                    <Button label={t('cancel')}
                        onClick={() => props.setOpen(false)}
                        icon={<Icon name="cancel" />}
                    />
                    <Button
                        label={t('save')}
                        onClick={handleSubmit}
                        icon={<Icon name="check" />}
                        disabled={!isValidInput() && !canSubmit}
                    />
                </ModalButtonContainer>
            </ModalContent>
        </ModalContainer>
    );
}

export default Modal;