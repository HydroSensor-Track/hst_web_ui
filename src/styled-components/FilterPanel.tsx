import styled from "styled-components";

export const FilterMainContainer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.colors.componentBackground};
    border-radius: 12px;
    height: 50%;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    width: 100%;
    background-color: ${(props) => props.theme.colors.componentBackground};
    border-radius: 12px;
    height: 100%;

`;

export const FilterTitle = styled.h4`
    color: '#fff';
    margin-top: 0.2vh;
    margin-bottom: 0.5vh;
`;

export const TimeFilterContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 90%;
    max-width: 400px;
    min-height: 3px;
    font-size: 2vh;
`;

export const ControlContainer = styled.div`
    display: flex;
`;

import { StylesConfig, GroupBase } from 'react-select';


export const customStyles: StylesConfig<any, false, GroupBase<any>> = {
    container: (provided) => ({
      ...provided,
      width: '90%', // Ajusta el ancho del container
      maxWidth: '400px', // O define un ancho máximo
      margin: '0 auto',  // Centra el select si es necesario
      height: '3vw',
      padding: '0',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0', // Remove padding from the dropdown indicator
        }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0f0f0' : '#ffffff', // Cambiar el fondo del control cuando está enfocado
      borderColor: state.isFocused ? '#2684FF' : '#cccccc', // Cambiar el borde cuando está enfocado
      '&:hover': {
        borderColor: '#2684FF' // Cambiar el borde al pasar el ratón
      },
      // height: '100%',
        height: '5vh',
        padding: '0',
        minHeight: '2vw',
        fontSize: '2vh'
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '2vh'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2684FF' : state.isFocused ? '#f0f0f0' : null,
      color: state.isSelected ? '#ffffff' : '#333333',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 999, // Asegurar que el menú siempre esté visible
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#2684FF' : '#333333', // Cambiar el color del valor seleccionado
      fontSize: '2vh'
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '2vh'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#2684FF', // Cambiar el fondo de las opciones seleccionadas
      color: '#ffffff', // Cambiar el color del texto de las opciones seleccionadas
      fontSize: '2vh'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#ffffff', // Color de texto de las opciones seleccionadas
      fontSize: '1.5vh'
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#ff0000' : '#ffffff', // Cambiar el color del ícono de eliminación al pasar el ratón
      ':hover': {
        backgroundColor: '#ff0000', // Cambiar el fondo al pasar el ratón
        color: '#ffffff', // Cambiar el color del ícono al pasar el ratón
      },
      width: '3vh'
    })
  };



  export const customStylesTime: StylesConfig<any, false, GroupBase<any>> =  {
    container: (provided) => ({
        ...provided,
        width: '40%', // Ajusta el ancho del container
        maxWidth: '400px', // O define un ancho máximo
        margin: '0 auto',  // Centra el select si es necesario
        height: '38px',
      }),
    
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0f0f0' : '#ffffff', // Cambiar el fondo del control cuando está enfocado
      borderColor: state.isFocused ? '#2684FF' : '#cccccc', // Cambiar el borde cuando está enfocado
      '&:hover': {
        borderColor: '#2684FF' // Cambiar el borde al pasar el ratón
      },
      height: '100%',
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
      color: state.isFocused ? '#2684FF' : '#333333', // Cambiar el color del valor seleccionado,
      fontSize: '2vh'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#2684FF', // Cambiar el fondo de las opciones seleccionadas
      color: '#ffffff', // Cambiar el color del texto de las opciones seleccionadas
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
      },
    })
  };
