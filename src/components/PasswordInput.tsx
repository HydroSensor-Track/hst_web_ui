import React, { useState } from 'react';

import Icon from './Icon';
import TextInput from './TextInput';
import { PasswordInputContainer, PasswordInputIcon } from '../styled-components/PasswordInput';

interface TextInputProps {
    placeholder?: string;
    onChange: (text: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<TextInputProps> = ({
    placeholder,
    onChange,
    onFocus,
    onBlur,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PasswordInputContainer>
            <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <PasswordInputIcon onClick={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'passwordEyeClosedIcon' : 'passwordEyeIcon'} />
            </PasswordInputIcon>
        </PasswordInputContainer>
    );
};

export default PasswordInput;