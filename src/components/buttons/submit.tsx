import { Button, Modal, Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useWindowSize } from 'usehooks-ts';
import { useState } from 'react';
import { modalStyle, dynamicButtonStyleGen } from '../../styles';

export function Submit() {
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" size="large" sx={dynamicButtonStyleGen(width, height)} onClick={handleOpen}>
        Submit Policy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You have succesfully submitted your policy!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            More details here!
          </Typography>
          <CheckCircle style={{ width: '60', height: '60', color: '#006400' }} />
        </Box>
      </Modal>
    </div>
  );
}
