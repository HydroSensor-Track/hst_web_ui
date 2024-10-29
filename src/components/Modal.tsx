import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalForm,
    ModalButtonContainer
} from "../styled-components/Modal";
import Button from "./Button";
import Icon from "./Icon";

type ModalProps = {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onSubmit: () => void;
    isOpen: boolean;
    canSubmit: boolean;
    isValidInput?: () => boolean;
    cancelText: string;
    submitText: string;
};

const Modal = ({
    title,
    children,
    onClose,
    onSubmit,
    isOpen,
    canSubmit,
    isValidInput,
    cancelText,
    submitText
}: ModalProps) => {
    const { t } = useTranslation();
    const theme = useTheme();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.body.classList.add('modal-open');
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>{t(title)}</ModalHeader>
                <ModalForm>{children}</ModalForm>
                <ModalButtonContainer>
                    <Button
                        label={t(cancelText)}
                        onClick={onClose}
                        icon={<Icon name="cancel" htmlColor={theme.colors.cancel} />}
                    />
                    <Button
                        label={t(submitText)}
                        onClick={onSubmit}
                        icon={<Icon name="check" htmlColor={theme.colors.success} />}
                        disabled={isValidInput ? !isValidInput() && !canSubmit : !canSubmit}
                    />
                </ModalButtonContainer>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;