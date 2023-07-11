import LocationCityIcon from '@mui/icons-material/LocationCity';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../store';
import { openPolicyModal } from '../../reducers/policySlice';
import { Typography } from '@mui/material';

export default function BasicMenu() {
  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    dispatch(openPolicyModal());
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={handleMenuClick}
      >
        <LocationCityIcon />
        <Typography>Policy</Typography>
      </IconButton>
    </div>
  );
}
