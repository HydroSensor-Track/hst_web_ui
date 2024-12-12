import styled from "styled-components";

export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.colors.modalBackground};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background-color: ${(props) => props.theme.colors.componentBackground};
    padding: 6vh;
    border-radius: 10px;
    width: 60%;
    overflow-y: auto;
`;

export const ModalHeader = styled.h2`
    margin-bottom: 3vh;
`;

export const ModalForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const ModalItem = styled.div`
    width: 40%;
    height: 11vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

export const ModalLabel = styled.label`
    color: ${(props) => props.theme.colors.text};
    font-size: 2.5vh;
`;

export const ModalTextError = styled.p`
    color: ${(props) => props.theme.colors.error};
    margin-top: 0; 
    font-size: 1.5vh;
`;

export const ModalInput = styled.input`
    padding: 10px;
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 3px;
`;

export const ModalPasswordInput = styled.input`
    padding: 10px;
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 3px;
    align-items: flex-start;
    flex-direction: row;
    padding-horizontal: 16px;
    flex-grow: 1;
`;

export const ModalButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: ${(props) => props.theme.sizes.buttonGap};
`;