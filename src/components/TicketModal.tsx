import React, { useState } from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    Box,
    Divider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material';
import {
    StyledDialog,
    StyledTextField,
    StyledButton
} from '../styled-components/TicketModal.tsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
// import { updateTicket } from '../redux/reducers/ticketSlice.ts';

const TicketDetailModal = ({ open, onClose, ticketId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const ticket = ticketsData.find((ticket) => ticket.idTicket === ticketId);

    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState(ticket);
    const [validationErrors, setValidationErrors] = useState({});

    if (!ticket) {
        return null;
    }

    const handleEditToggle = () => {
        setEditable(!editable);
    };

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
        setValidationErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const handleSaveChanges = () => {
        let errors = {};
        ['location', 'status', 'assignee', 'category', 'sensorId', 'description'].forEach((field) => {
            if (!formData[field]) {
                errors[field] = t('requiredField');
            }
        });
        setValidationErrors(errors);
        if (Object.keys(errors).length === 0) {
            // dispatch(updateTicket(formData));
            setEditable(false);
            alert(t('updateSuccess'));
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>{t('ticketDetails')}</DialogTitle>

            <DialogContent>
                <Grid container spacing={2} sx={{ backgroundColor: '#1e1e1e', p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#00bcd4', fontWeight: 'bold', mb: 2 }}>
                            {t('ticketInformation')}
                        </Typography>
                        <Divider sx={{ marginBottom: 3, backgroundColor: '#00bcd4' }} />
                    </Grid>

                    {editable ? (
                        <>
                            {/** Editable View with Dropdowns */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" error={Boolean(validationErrors.location)}>
                                    <InputLabel>{t('location')}</InputLabel>
                                    <Select
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        label={t('location')}
                                    >
                                        {/* Populate with location options */}
                                        <MenuItem value="Location1">Location 1</MenuItem>
                                        <MenuItem value="Location2">Location 2</MenuItem>
                                    </Select>
                                    <FormHelperText>{validationErrors.location}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" error={Boolean(validationErrors.status)}>
                                    <InputLabel>{t('status')}</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        label={t('status')}
                                    >
                                        <MenuItem value="Open">Open</MenuItem>
                                        <MenuItem value="Closed">Closed</MenuItem>
                                    </Select>
                                    <FormHelperText>{validationErrors.status}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" error={Boolean(validationErrors.assignee)}>
                                    <InputLabel>{t('assignee')}</InputLabel>
                                    <Select
                                        value={formData.assignee}
                                        onChange={(e) => handleInputChange('assignee', e.target.value)}
                                        label={t('assignee')}
                                    >
                                        {/* Populate with assignee options */}
                                        <MenuItem value="Assignee1">Assignee 1</MenuItem>
                                        <MenuItem value="Assignee2">Assignee 2</MenuItem>
                                    </Select>
                                    <FormHelperText>{validationErrors.assignee}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" error={Boolean(validationErrors.category)}>
                                    <InputLabel>{t('category')}</InputLabel>
                                    <Select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        label={t('category')}
                                    >
                                        {/* Populate with category options */}
                                        <MenuItem value="Category1">Category 1</MenuItem>
                                        <MenuItem value="Category2">Category 2</MenuItem>
                                    </Select>
                                    <FormHelperText>{validationErrors.category}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <StyledTextField
                                    label={t('sensorId')}
                                    fullWidth
                                    value={formData.idSensor}
                                    onChange={(e) => handleInputChange('idSensor', e.target.value)}
                                    variant="outlined"
                                    required
                                    error={Boolean(validationErrors.sensorId)}
                                    helperText={validationErrors.sensorId}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <StyledTextField
                                    label={t('description')}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    variant="outlined"
                                    required
                                    error={Boolean(validationErrors.description)}
                                    helperText={validationErrors.description}
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            {/** Static View */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary">{t('location')}:</Typography>
                                <Typography variant="h5" color="info.main">{formData.location}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary">{t('status')}:</Typography>
                                <Typography variant="h5" color="info.main">{formData.status}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary">{t('assignee')}:</Typography>
                                <Typography variant="h5" color="info.main">{formData.assignee || t('unassigned')}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary">{t('category')}:</Typography>
                                <Typography variant="h5" color="info.main">{formData.category}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="textSecondary">{t('sensorId')}:</Typography>
                                <Typography variant="h5" color="info.main">{formData.idSensor}</Typography>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" color="textSecondary">{t('description')}:</Typography>
                                <Typography variant="body1" color="info.main" sx={{ whiteSpace: 'pre-line' }}>
                                    {formData.description}
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>
            </DialogContent>

            <DialogActions>
                {editable ? (
                    <StyledButton onClick={handleSaveChanges} color="primary">
                        {t('saveChanges')}
                    </StyledButton>
                ) : (
                    <StyledButton onClick={handleEditToggle} color="primary">
                        {t('edit')}
                    </StyledButton>
                )}
                <StyledButton onClick={onClose} color="secondary">
                    {t('close')}
                </StyledButton>
            </DialogActions>
        </StyledDialog>
    );
};

export default TicketDetailModal;