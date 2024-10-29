import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { UserInfo } from '../interfaces/userInfo';
import Icon from './Icon';
import Button from './Button';
import { dialogStyles, textFieldStyles } from '../mui-styles/editFieldDialogStyles';

interface EditFieldDialogProps {
    open: boolean;
    title: string;
    handleClose: () => void;
    handleSave: () => void;
    handleChange: (field: keyof UserInfo) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    editableField: Partial<UserInfo>;
    errors: { [key in keyof UserInfo]?: string };
    disabled: boolean;
}

const EditFieldDialog: React.FC<EditFieldDialogProps> = ({
    open,
    title,
    handleClose,
    handleSave,
    handleChange,
    editableField,
    errors,
    disabled,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={dialogStyles(theme)}>
            <DialogTitle>{t(title)}</DialogTitle>
            <DialogContent>
                {Object.keys(editableField).map((field) => (
                    <TextField
                        key={field}
                        margin="dense"
                        label={field}
                        type="text"
                        fullWidth
                        value={(editableField as any)[field]}
                        onChange={handleChange(field as keyof UserInfo)}
                        error={!!errors[field as keyof UserInfo]}
                        helperText={errors[field as keyof UserInfo]}
                        sx={textFieldStyles(theme)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button
                    label={t('cancel')}
                    onClick={handleClose}
                    icon={<Icon name="cancel" htmlColor={theme.colors.cancel} />}
                />
                <Button
                    label={t('save')}
                    onClick={handleSave}
                    icon={<Icon name="check" htmlColor={theme.colors.success} />}
                    disabled={disabled}
                />
            </DialogActions>
        </Dialog>
    );
};

export default EditFieldDialog;