import React, { useEffect, useState } from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    FormControlLabel,
} from '@mui/material';
import {
    StyledDialog,
    StyledTextField,
    StyledButton,
    StyledFormControl,
    StyledRadioGroup,
    StyledRadio,
} from '../styled-components/CreateTicketDialog.tsx';
import StyledSelectComponent from '../styled-components/StyledMuiSelect.tsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { createTicket } from '../redux/reducers/ticketSlice.ts';
import { useDispatch } from 'react-redux';

const CreateTicketDialog = ({ open, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [sensorId, setSensorId] = useState('');
    const [assignee, setAssignee] = useState(t('unassigned'));
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [projectType, setProjectType] = useState('delta-parana');

    const assigneesData = [t('unassigned'),"User 1", "User 2", "User 3"] // TODO: replace with getUsers
    const locationData = useSelector((state: RootState) => state.sensor.locations);
    const sensors = useSelector((state: RootState) => state.sensor.sensors);
    const ticketsData = useSelector((state: RootState) => state.ticket.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        //Set all states to null
        setDescription('');
        setLocation('');
        setSensorId('');
        setAssignee(t('unassigned'));
        setCategory('');
        setCustomCategory('');
        setProjectType('delta-parana');
    }, [open]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setValidationErrors({...validationErrors, category: ''});
        if (selectedCategory === 'custom') {
            setCategory('');
        } else {
            setCategory(selectedCategory);
            setCustomCategory('');
        }
    };

    const handleSubmit = () => {
        let errors = {};

        if (!description) errors.description = t('requiredField');
        if (!location) errors.location = t('requiredField');
        if (!sensorId) errors.sensorId = t('requiredField');
        if (!assignee) errors.assignee = t('requiredField');
        if (!category && !customCategory) errors.category = t('requiredField');

        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            const finalCategory = category || customCategory;

            const maxId = ticketsData.reduce((max: number, ticket: { idTicket: number; }) => Math.max(max, ticket.idTicket), 0);


            const ticketData = {
                idTicket: maxId + 1,
                idSensor: parseInt(sensorId),
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
                status: assignee === t('unassigned') ? "UNASSIGNED" : "ASSIGNED",
                createdBy: "defaultUser", //TODO: Complete with user.currentUser
                updatedBy: "defaultUser", // TODO: Complete with user.currentUser
                assignee,
                description,
                finalCategory,
                location,
            };

            dispatch(createTicket(ticketData));//TODO: fIX THIS
            onSubmit(ticketData);
            onClose();
        }
    };

    return (
        <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>
                {t('createTicket')}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2} style={{ "marginTop": "0.5vh" }}>
                    {/* Radio Group for Project Type */}
                    <Grid item xs={12}>
                        <StyledRadioGroup
                            aria-label="projectType"
                            name="projectType"
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            row
                        >
                            <FormControlLabel
                                value="delta-parana"
                                control={<StyledRadio />}
                                label={t('deltaParana')}
                            />
                            <FormControlLabel
                                value="prevenir"
                                control={<StyledRadio />}
                                label={t('prevenir')}
                            />
                        </StyledRadioGroup>
                    </Grid>

                    {/* Left Section: Select Inputs */}
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <StyledSelectComponent
                                    label={t('location')}
                                    value={location}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setLocation(value);
                                        setValidationErrors((prev) => ({ ...prev, location: '' }));
                                    }}
                                    options={locationData}
                                    required
                                />
                                {validationErrors.location && (
                                    <div style={{ color: 'red' }}>{validationErrors.location}</div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <StyledSelectComponent
                                    label={t('sensorId')}
                                    value={sensorId}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSensorId(value);
                                        setValidationErrors((prev) => ({ ...prev, sensorId: '' }));
                                    }}
                                    options={sensors.filter((sensor) => sensor.name === location).map((sensor) => sensor.id)}
                                    required
                                />
                                {validationErrors.sensorId && (
                                    <div style={{ color: 'red' }}>{validationErrors.sensorId}</div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <StyledSelectComponent
                                    label={t('assignee')}
                                    value={assignee}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setAssignee(value);
                                        setValidationErrors((prev) => ({ ...prev, assignee: '' }));
                                    }}
                                    options={assigneesData}
                                    required
                                />
                                {validationErrors.assignee && (
                                    <div style={{ color: 'red' }}>{validationErrors.assignee}</div>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Section: Radio Group for Categories */}
                    <Grid item xs={6}>
                        <StyledRadioGroup
                            aria-label="category"
                            name="category"
                            value={category || 'custom'}
                            onChange={handleCategoryChange}
                        >
                            <FormControlLabel
                                value="mantenimiento"
                                control={<StyledRadio />}
                                label={t('maintenance')}
                            />
                            <FormControlLabel
                                value="fueraDeServicio"
                                control={<StyledRadio />}
                                label={t('outOfService')}
                            />
                            <FormControlLabel
                                value="custom"
                                control={<StyledRadio />}
                                label={t('customCategory')}
                            />
                            {category === '' && (
                                <StyledTextField
                                    label={t('enterCustomCategory')}
                                    fullWidth
                                    variant="outlined"
                                    value={customCategory}
                                    onChange={(e) => {
                                        setCustomCategory(e.target.value);
                                        setValidationErrors((prev) => ({ ...prev, category: '' }));
                                    }}
                                />
                            )}
                            {validationErrors.category && (
                                <div style={{ color: 'red' }}>{validationErrors.category}</div>
                            )}
                        </StyledRadioGroup>
                    </Grid>

                    {/* Description Input at Bottom */}
                    <Grid item xs={12}>
                        <StyledTextField
                            label={t('description')}
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setValidationErrors((prev) => ({ ...prev, description: '' }));
                            }}
                            variant="outlined"
                            required
                        />
                        {validationErrors.description && (
                            <div style={{ color: 'red' }}>{validationErrors.description}</div>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>

            {/* Action Buttons */}
            <DialogActions>
                <StyledButton onClick={onClose} color="secondary">
                    {t('cancel')}
                </StyledButton>
                <StyledButton onClick={handleSubmit} color="primary">
                    {t('create')}
                </StyledButton>
            </DialogActions>
        </StyledDialog>
    );
};

export default CreateTicketDialog;
