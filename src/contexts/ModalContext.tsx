import { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextProps = {
    openModal: boolean;
    updateOpenModal: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [openModal, setOpenModal] = useState(false);

    const updateOpenModal = (open: boolean) => {
        setOpenModal(open);
    };

    return (
        <ModalContext.Provider value={{ openModal, updateOpenModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};