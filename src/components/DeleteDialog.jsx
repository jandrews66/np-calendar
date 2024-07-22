import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { StyledEngineProvider } from '@mui/material';
//inject first needed to override mui styling with our Tailwind styling

export default function DeleteDialog({ handleDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <StyledEngineProvider
    injectFirst>
      <React.Fragment>
        <Button 
          variant="outlined" 
          onClick={handleClickOpen}
          className="w-full py-2 px-4 bg-red-600 text-white normal-case font-semibold rounded-md shadow-md hover:bg-red-700"
        >
          Delete
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: '#f8f9fa', // Background color for the dialog
              borderRadius: '8px', // Rounded corners
              padding: '16px', // Padding
            },
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ color: '#212529', fontSize: '16px' }}>
              Are you sure you want to permanently delete this booking?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="text-gray-600 normal-case">Cancel</Button>
            <Button onClick={confirmDelete} autoFocus className="text-red-600 normal-case">Confirm</Button>

          </DialogActions>
        </Dialog>
      </React.Fragment>
    </StyledEngineProvider>

  );
}
