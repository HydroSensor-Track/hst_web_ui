import { useEffect, useState } from 'react';
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
  StyledRadioGroup,
  StyledRadio,
} from '../styled-components/CreateTicketDialog.tsx';
import StyledSelectComponent from '../styled-components/StyledMUIComponent.tsx';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {AppDispatch, RootState} from '../redux/store.ts';
import { createTicket } from '../redux/reducers/ticketSlice.ts';
import { CreateTicket, TicketCategory, TicketCategoryDict, TicketStatus, TicketStatusDict } from '../interfaces/tickets.ts';
import { NETWORK, Network } from '../interfaces/sensorInfo.ts';

type ValidationErrors = {
  description?: string;
  location?: string;
  sensor?: string;
  category?: string;
}

const CreateTicketDialog = ({ open, onClose, onSubmit }) => {

  const { t } = useTranslation();

  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [sensor, setSensor] = useState('');
  const [assignee, setAssignee] = useState<string>(TicketStatusDict[TicketStatus.UNASSIGNED]);
  const [category, setCategory] = useState<TicketCategory>(TicketCategory.MANTENIMIENTO);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [red, setRed] = useState<Network>(NETWORK.DELTA_PARANA);

  const [availableSensors, setAvailableSensors] = useState([""]);
  const [availableLocations, setAvailableLocations] = useState([""]);

  const users = useSelector((state: RootState) => state.users.users);
  const current_user = useSelector((state: RootState) => state.users.current_user);
  const assigneesData = [TicketStatusDict[TicketStatus.UNASSIGNED], ...users.map((user) => {return user.username})];

  const networkData = useSelector((state: RootState) => state.sensorsInfo.byLocation);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

    setAvailableLocations(Object.keys(networkData[red]))
    setAvailableSensors([""])

  }, [red, networkData]);

  useEffect(() => {

    if (location !== "") {
        setAvailableSensors(networkData[red][location].map((sensor) => sensor.id))
    }

  }, [location]);


  const handleSubmit = () => {
    const errors: ValidationErrors = {};

    if (!description) errors.description = "Campo obligatorio";
    if (!location) errors.location = "Campo obligatorio";
    if (!sensor) errors.sensor = "Campo obligatorio";
    if (!category) errors.category = "Campo obligatorio";

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {

      const ticketData: CreateTicket = {
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          status: assignee === TicketStatusDict[TicketStatus.UNASSIGNED] ? TicketStatus.UNASSIGNED : TicketStatus.ASSIGNED,
          createdBy: current_user.username ? current_user.username : "default",
          updatedBy: current_user.username ? current_user.username : "default",
          category: category ? category : TicketCategory.MANTENIMIENTO,
          assignee: assignee === TicketStatusDict[TicketStatus.UNASSIGNED] ? null : assignee,
          description,
          location,
          red,
          sensor
      };

      console.log("Ticket Data", ticketData);
      dispatch(createTicket({ticket:ticketData, red:red}));
      onSubmit(ticketData);
      onClose();
        }
    };


  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Crear ticket</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} style={{ marginTop: '0.5vh' }}>
          {/* Radio Group for Project Type */}
          <Grid item xs={12}>
            <StyledRadioGroup
              aria-label="red"
              name="red"
              value={red}
              onChange={(e) => setRed(e.target.value as Network)}
              row
            >
              <FormControlLabel
                value={NETWORK.DELTA_PARANA}
                control={<StyledRadio />}
                label={NETWORK.DELTA_PARANA}
              />
              <FormControlLabel
                value={NETWORK.PREVENIR}
                control={<StyledRadio />}
                label={NETWORK.PREVENIR}
              />
            </StyledRadioGroup>
          </Grid>

          {/* Left Section: Select Inputs */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label="Ubicacion"
                  value={location}
                  onChange={(e: { target: { value: string; }; }) => {
                    const value = e.target.value;
                    setLocation(value);
                    setSensor('');
                    setValidationErrors((prev) => ({ ...prev, location: '' }));
                  }}
                  options={availableLocations}
                  required
                />
                {validationErrors.location && (
                  <div style={{ color: 'red' }}>{validationErrors.location}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label="Sensor"
                  value={sensor}
                  onChange={(e: { target: { value: string; }; }) => {
                    const value = e.target.value;
                    setSensor(value);
                    setValidationErrors((prev) => ({ ...prev, sensor: '' }));
                  }}
                  options={availableSensors}
                  required
                />
                {validationErrors.sensor && (
                  <div style={{ color: 'red' }}>{validationErrors.sensor}</div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label="Asignado"
                  value={assignee}
                  onChange={(e: { target: { value: string; }; }) => {
                    const value = e.target.value;
                    setAssignee(value);
                    setValidationErrors((prev) => ({ ...prev, assignee: '' }));
                  }}
                  options={assigneesData}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label="Categoría"
                  value={category}
                  onChange={(e: { target: { value: string; }; }) => {
                    const key = e.target.value as TicketCategory;
                    setCategory(key);
                    setValidationErrors((prev) => ({ ...prev, category: '' }));
                  }}
                  options={Object.entries(TicketCategoryDict).map(([key, value]) => ({
                    value: key, // Clave que será guardada
                    label: value, // Valor visible para el usuario
                  }))}
                  required
                />
                {validationErrors.category && (
                  <div style={{ color: 'red' }}>{validationErrors.category}</div>
                )}
              </Grid>
            </Grid>
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
          Cancelar
        </StyledButton>
        <StyledButton onClick={handleSubmit} color="primary">
          Crear
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default CreateTicketDialog;
