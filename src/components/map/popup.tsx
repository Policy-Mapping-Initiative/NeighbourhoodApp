import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Marker, Popup } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { MapProps } from './index';

export function createPopup(props: MapProps) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setZone(event.target.value);
  };

  return (
    <Marker position={[43.6529, -79.3849]}>
      <Popup>
        <Typography variant="subtitle2">Neighbourhood</Typography>
        <Divider />
        <Typography variant="body2">Population: 1000</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Zone</InputLabel>
            <Select
              labelId="zone-selector-1"
              value={props.zoneVar}
              id="zone-selector"
              label="Zone"
              onChange={handleChange}
            >
              <MenuItem value={'single'}>Single</MenuItem>
              <MenuItem value={'double'}>Double</MenuItem>
              <MenuItem value={'triple'}>Triple</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Popup>
    </Marker>
  );
}
