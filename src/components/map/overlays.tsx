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
import { updateUserSetZoning, updateSelectedId } from '../../reducers/neighbourhoodSlice';
import { perc2color } from '../../utils';
import { useState } from 'react';
import { IZone } from '../../interfaces/zone';
import { ZoneType } from '../../models/enums';

export function NeighbourhoodOverlay(feat: INeighbourhood) {
  const [value, setValue] = useState('single');
  const neighId = feat.properties.id;
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
        dispatch(updateSelectedId(neighId));
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
  const getColour = (): string => {
    switch (feat.properties.type) {
      case ZoneType.RESIDENTIAL_LOW:
      case ZoneType.RESIDENTIAL:
        return 'yellow';
      case ZoneType.RESIDENTIAL_MID_HIGH:
        return 'goldenrod';
      case ZoneType.OPEN_SPACE:
        return 'forestgreen';
      case ZoneType.MIXED_USE:
        return 'mediumblue';
      case ZoneType.COMMERCIAL:
        return 'goldenrod';
      default:
        return 'rebeccapurple';
    }
  };

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
        key={feat.properties.id}
        data={feat.geometry}
        style={{ color: getColour(), fillOpacity: 0.2 }}
        eventHandlers={{
          mouseover: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'over'),
          mouseout: (event: L.LeafletMouseEvent) => onMouseEvent(event, 'out'),
        }}
      >
        <Popup>
          <Typography variant="subtitle2">Type: {feat.properties.type}</Typography>
          <Typography variant="subtitle2">ID: {feat.properties.id}</Typography>
        </Popup>
      </GeoJSON>
    </LayerGroup>
  );
}
