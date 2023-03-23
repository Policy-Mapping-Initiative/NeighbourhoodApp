import { Button, Modal, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';
import { useWindowSize } from 'usehooks-ts';
import { useState } from 'react';

export function Submit() {
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const SubmitButton = styled(Button)({
    zIndex: 1000,
    position: 'absolute',
    top: height - 300,
    left: width - 200,
  });

  const BoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <SubmitButton variant="contained" size="large" onClick={handleOpen}>
        Submit Policy
      </SubmitButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={BoxStyle}>
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
