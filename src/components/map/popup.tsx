import L from 'leaflet';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Popup, LayerGroup, GeoJSON } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { INeighbourhood } from '../../interfaces/neigbourhood';
import { useAppDispatch } from '../../store';
import { updateUserSetZoning } from '../../reducers/neighbourhoodSlice';
import { perc2color } from '../../utils';
import { Dispatch, useState, SetStateAction } from 'react';
import { IZone } from '../../interfaces/zone';

export function NeighbourhoodOverlay(feat: INeighbourhood, neighbourhoodIdSetter: Dispatch<SetStateAction<string>>) {
  const [value, setValue] = useState('single');
  const [neighId, setId] = useState(feat.properties.id.toString()); // eslint-disable-line
  const dispatch = useAppDispatch();

  const onChange = (event: SelectChangeEvent) => {
    const temp = { neighbourhoodId: event.target.name, newZoning: event.target.value };
    dispatch(updateUserSetZoning(temp));
    setValue(event.target.value);
  };

  const onMouseEvent = (event: L.LeafletMouseEvent, type: string) => {
    switch (type) {
      case 'over':
        event.target.setStyle({ fillOpacity: 0.5 });
        break;
      case 'out':
        event.target.setStyle({ fillOpacity: 0.2 });
        break;
      case 'click':
        neighbourhoodIdSetter(neighId);
        break;
      default:
        break;
    }
  };

  const name = feat.properties.name;
  const id = feat.properties.id;
  const percentSfh = (feat.properties.singleFamilyCount / feat.properties.residenceCount) * 100;
  const percentSfhStr = percentSfh.toPrecision(4);
  const color = perc2color(percentSfh);
  const density = feat.properties.density.toPrecision(5);

  return (
    <LayerGroup>
      <GeoJSON
        key={id}
        data={feat.geometry}
        style={{ color: color, fillOpacity: 0.2 }}
        eventHandlers={{
          mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
          mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
          click: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'click'),
        }}
      >
        <Popup>
          <Typography variant="subtitle2">Neighbourhood: {name}</Typography>
          <Divider />
          <Typography variant="body2" style={{ margin: 3 }}>
            Population: {feat.properties.population}
          </Typography>
          <Typography variant="body2" style={{ margin: 3 }}>
            Density: {density} persons / sq.km
          </Typography>
          <Typography variant="body2" style={{ margin: 3 }}>
            Single Family Residential Prevalence: {percentSfhStr}%
          </Typography>
          <Box sx={{ minWidth: 120, paddingTop: '10px' }}>
            <FormControl fullWidth>
              <InputLabel>Zone</InputLabel>
              <Select name={name} id={name} value={value} label="Zone" onChange={event => onChange(event)}>
                <MenuItem value={'single'}>Single</MenuItem>
                <MenuItem value={'double'}>Double</MenuItem>
                <MenuItem value={'triple'}>Triple</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Popup>
      </GeoJSON>
    </LayerGroup>
  );
}

export function ZoneOverlay(feat: IZone) {
  const id = feat.properties.id;

  const onMouseEvent = (event: L.LeafletMouseEvent, type: string) => {
    switch (type) {
      case 'over':
        event.target.setStyle({ fillOpacity: 0.5 });
        break;
      case 'out':
        event.target.setStyle({ fillOpacity: 0.2 });
        break;
      default:
        break;
    }
  };

  return (
    <LayerGroup>
      <GeoJSON
        key={id}
        data={feat.geometry}
        style={{ color: 'blue', fillOpacity: 0.2 }}
        eventHandlers={{
          mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
          mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
        }}
      >
      </GeoJSON>
    </LayerGroup>
  );
}
