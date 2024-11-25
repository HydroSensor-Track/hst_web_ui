import styled from "styled-components";
import { StylesConfig, GroupBase } from 'react-select';

export const customStyles: StylesConfig<any, false, GroupBase<any>> = {
    container: (provided) => ({
        ...provided,
        width: '90%', // Ajusta el ancho del container
        maxWidth: '400px', // O define un ancho máximo
        margin: '0 auto',  // Centra el select si es necesario
        height: '30px',
        minHeight: '30px'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '30px',
        minHeight: '30px'
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f0f0f0' : '#ffffff', // Cambiar el fondo del control cuando está enfocado
        borderColor: state.isFocused ? '#2684FF' : '#cccccc', // Cambiar el borde cuando está enfocado
        '&:hover': {
            borderColor: '#2684FF' // Cambiar el borde al pasar el ratón
        },
        // height: '100%',
        height: '30px',
        minHeight: '30px'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2684FF' : state.isFocused ? '#f0f0f0' : null,
        color: state.isSelected ? '#ffffff' : '#333333',
        padding: 10,
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 999, // Asegurar que el menú siempre esté visible
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isFocused ? '#2684FF' : '#333333', // Cambiar el color del valor seleccionado
        fontSize: '12px',
    }),
    input: (provided) => ({
        ...provided,
        fontSize: '12px',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#2684FF', // Cambiar el fondo de las opciones seleccionadas
        color: '#ffffff', // Cambiar el color del texto de las opciones seleccionadas
        fontSize: '12px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#ffffff', // Color de texto de las opciones seleccionadas
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: state.isFocused ? '#ff0000' : '#ffffff', // Cambiar el color del ícono de eliminación al pasar el ratón
        ':hover': {
            backgroundColor: '#ff0000', // Cambiar el fondo al pasar el ratón
            color: '#ffffff', // Cambiar el color del ícono al pasar el ratón
        }
    })
};