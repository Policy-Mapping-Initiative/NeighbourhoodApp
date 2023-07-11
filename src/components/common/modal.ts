import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: theme.spacing(3, 4),
  transform: ['translate(-50%, -50%)'],
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: ['24px'],
  [theme.breakpoints.up('sm')]: {
    width: 400,
  },
  [theme.breakpoints.down('sm')]: {
    width: '70%',
  },
}));
