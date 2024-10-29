import React from 'react';

import { StyledTextInput } from '../styled-components/TextInput';

interface TextInputProps {
    type: string;
    placeholder?: string;
    onChange: (text: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
    type,
    placeholder,
    onChange,
    onFocus,
    onBlur,
}) => {

    return (
        <StyledTextInput
            type={type}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};

export default TextInput;