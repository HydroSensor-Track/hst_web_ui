import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  StyledDialog,
  StyledButton,
} from '../styled-components/UpdateTicketDialog.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store.ts';
import { deleteTicket } from '../redux/reducers/ticketSlice.ts';
import Icon from './Icon.tsx';
import { Network } from '../interfaces/sensorInfo.ts';



type TicketDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (idTicket: string) => void;
  idTicket: string;
  red: Network
};

const DeleteTicketDialog = ({ open, onClose, onSubmit, idTicket, red }: TicketDialogProps) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {

      dispatch(deleteTicket({ idTicket: idTicket, red: red }));
      onSubmit(idTicket);
      onClose();
    };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div style={{display: "flex", justifyContent: "space-between"}} >
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <DialogTitle style={{color: "#1E1E1E"}}>Eliminar Ticket</DialogTitle>
          <Icon name="delete" htmlColor='#1E1E1E'/>
        </div>
      </div>
      <DialogContent>
        <div style={{color: "#1E1E1E"}}>¿Estás seguro que quieres eliminar el ticket con id <span>{idTicket}</span> ?</div>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} color="secondary">
          No, cancelar
        </StyledButton>
        <StyledButton onClick={handleSubmit} color="primary">
          Si, eliminar
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default DeleteTicketDialog;
