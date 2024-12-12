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
  StyledSelectComponent
} from '../styled-components/UpdateTicketDialog.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { updateTicket } from '../redux/reducers/ticketSlice.ts';
import { Ticket, TicketCategoryDict, TicketStatus, TicketStatusDict, UpdateTicket } from '../interfaces/tickets.ts';
import Select, { SingleValue } from 'react-select';
import { customStyles } from "../styled-components/FilterPanel.tsx";
import Icon from './Icon.tsx';

type ValidationErrors = {
  description?: string;
  assignee?: string;
  status?: string;
};

type TicketDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  onSubmit: (data: UpdateTicket) => void;
  mode: 'create' | 'edit'; 
  initialData: Ticket; 
  disabledEdit: boolean;
};

const UpdateTicketDialog = ({ open, onClose, onDelete, onSubmit, mode, initialData, disabledEdit }: TicketDialogProps) => {

  const dispatch = useDispatch<AppDispatch>();

  const isEditMode = mode === 'edit';
  
  // State variables
  const [description, setDescription] = useState(initialData.description);
  const [assignee, setAssignee] = useState(initialData.assignee);
  const [status, setStatus] = useState<TicketStatus>(initialData.status);

  const [errors, setValidationErrors] = useState<ValidationErrors>({});

  const users = useSelector((state: RootState) => state.users.users);
  const current_user = useSelector((state: RootState) => state.users.current_user);

  const assigneesData = users.map((user) => user.username);

  const handleSubmit = () => {
    const errors: ValidationErrors = {};

    if (!description) errors.description = 'Campo requerido';
    if (!assignee) errors.assignee = 'Campo requerido';
    if (!status) errors.status = 'Campo requerido';

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {

      const ticketData : UpdateTicket = {
        idTicket: initialData.idTicket,
        updatedBy: current_user.username || 'default',
        description,
        assignee: assignee,
        status: status,
      };

      dispatch(updateTicket({ ticket: ticketData, red: initialData.red }));

      onSubmit(ticketData);
      onClose();
    }
  };

  useEffect(() => {
    console.log(initialData)
    if (!assignee) {
      setStatus(TicketStatus.UNASSIGNED)
    } else if (status === TicketStatus.UNASSIGNED){
      setStatus(TicketStatus.ASSIGNED) 
    }
  }, [assignee])

  useEffect(() => {
    const errors: ValidationErrors = {};
    if (status === TicketStatus.UNASSIGNED) {
      setAssignee(null)
    } else if (status == TicketStatus.ASSIGNED && !assignee) 
    {
      errors.assignee = 'Campo requerido';
      setValidationErrors(errors)
    }
  }, [status])

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div style={{display: "flex", justifyContent: "space-between"}} >
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <DialogTitle style={{color: "#1E1E1E"}}>Editar Ticket</DialogTitle>
          <Icon name="edit" htmlColor='#1E1E1E'/>
        </div>
        <div style={{display: "flex", width: "30%", margin: "15px"}}>
          <div style={{color: "#1E1E1E", fontSize: "12px", margin: "10px 10px 5px 5px", fontWeight: "bold"}}>Estado:</div>
          <Select 
                value={{label: TicketStatusDict[status], value: status}}
                name="status"
                placeholder="Estado"
                isDisabled={disabledEdit}
                onChange={(selectedOption: SingleValue<{ value: string; label: string; }>) => {
                  const key = selectedOption?.value as TicketStatus;
                  setStatus(key);
                  setValidationErrors((prev) => ({ ...prev, status: '' }));
                }}
                options={Object.entries(TicketStatusDict).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
                styles={{...customStyles, }} 
                />
        </div>
      </div>
      <DialogContent>
        {/* Same structure as before, use state variables */}
        {/* Radio Group */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledRadioGroup
              aria-label="projectType"
              value={initialData.red}
              row
            >
              <FormControlLabel
                value="delta-parana"
                control={<StyledRadio />}
                disabled={true}
                label={'Delta Parana'}
              />
              <FormControlLabel
                value="prevenir"
                control={<StyledRadio />}
                disabled={true}
                label={'Prevenir'}
              />
            </StyledRadioGroup>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label='Ubicacion'
                  value={initialData.location}
                  disabled={true}
                  options={[initialData.location]}
                  required

                />
              </Grid>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label='Sensor'
                  value={initialData.sensor}
                  disabled={true}
                  options={[initialData.sensor]}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledSelectComponent
                  label="Asignar usuario"
                  value={assignee}
                  disabled={disabledEdit}
                  onChange={(e: { target: { value: string; }; }) => {
                    const value = e.target.value;
                    setAssignee(value);
                    setValidationErrors((prev) => ({ ...prev, assignee: '' }));
                  }}
                  options={assigneesData}
                  required
                />
                {errors.assignee && (
                  <div style={{ color: 'red' }}>{errors.assignee}</div>
                )}
              </Grid>
              <Grid item xs={12}>
              <StyledSelectComponent
                  label="Categoría"
                  value={TicketCategoryDict[initialData.category]}
                  disabled={true}
                  options={[TicketCategoryDict[initialData.category]]}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Description Input at Bottom */}
          <Grid item xs={12}>
            <StyledTextField
              label='Descripcion'
              fullWidth
              multiline
              rows={4}
              value={description}
              disabled={disabledEdit}
              onChange={(e) => {
                setDescription(e.target.value);
                setValidationErrors((prev) => ({ ...prev, description: '' }));
              }}
              variant="outlined"
              required
            />
            {errors.description && (
              <div style={{ color: 'red' }}>{errors.description}</div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      {disabledEdit ? 
        <Grid container >
        <Grid item xs={6} marginLeft={"15px"}>
            <StyledButton onClick={onDelete} color="error">
                Eliminar
            </StyledButton>
        </Grid>
        <Grid item xs={5.5}>
          <DialogActions>
            <StyledButton onClick={onClose} color="secondary">
              Cerrar
            </StyledButton>
          </DialogActions>
        </Grid>
      </Grid>
      : 
      <Grid container >
        <Grid item xs={6} marginLeft={"15px"}>
            <StyledButton onClick={onDelete} color="error">
                Eliminar
            </StyledButton>
        </Grid>
        <Grid item xs={5.5}>
          <DialogActions>
            <StyledButton onClick={onClose} color="secondary">
              Cancelar
            </StyledButton>
            <StyledButton onClick={handleSubmit} color="primary">
              {isEditMode ? 'Guardar' : 'Crear'}
            </StyledButton>
          </DialogActions>
        </Grid>
      </Grid>
      }
    </StyledDialog>
  );
};

export default UpdateTicketDialog;
