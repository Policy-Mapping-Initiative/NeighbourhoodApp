import { Modal, Typography } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { ModalBox } from '../common/modal';

export function IntroModal() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='modal-title' aria-describedby='modal-description'>
      <ModalBox>
        <Typography variant='h6'>
          Neighbourhood
        </Typography>
        <Divider />
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo. Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed malesuada lobortis pretium.
        </Typography>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <LocationCityIcon style={{ fontSize: 70 }} sx={{verticalAlign: 'middle'}} />
        </div>
      </ModalBox>
    </Modal>
  );
}
