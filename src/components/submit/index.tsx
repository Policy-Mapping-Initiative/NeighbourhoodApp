import { Modal, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useState } from 'react';
import { SubmitButton } from './styledComponent';
import { ModalBox } from '../common/modal';

export function Submit() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <SubmitButton onClick={handleOpen}>
        <Typography variant="body1" noWrap component="div" sx={{ flexGrow: 1 }}>
          Submit Policy
        </Typography>
      </SubmitButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <ModalBox>
          <Typography variant="h6" component="h2">
            You have succesfully submitted your policy!
          </Typography>
          <Typography sx={{ mt: 2 }}>More details here!</Typography>
          <CheckCircle style={{ width: '60', height: '60', color: '#006400' }} />
        </ModalBox>
      </Modal>
    </div>
  );
}
