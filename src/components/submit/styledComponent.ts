import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const SubmitButton = styled(Button)(({ theme }) => ({
  zIndex: 1000,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  [theme.breakpoints.up('sm')]: {
    position: 'absolute',
    height: 50,
    width: 150,
    bottom: '10%',
    right: '5%',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 50,
    textAlign: 'center',
  },
}));
