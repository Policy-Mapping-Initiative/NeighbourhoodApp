import L from 'leaflet';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Popup, LayerGroup, GeoJSON, Marker } from 'react-leaflet';
import { Typography, Divider } from '@mui/material';
import { INeighbourhood } from '../../interfaces/neigbourhood';
import { useAppDispatch } from '../../store';
import { updateUserSetZoning, updateSelectedId } from '../../reducers/neighbourhoodSlice';
import { perc2color, humanize } from '../../utils';
import { useState } from 'react';
import { IZone } from '../../interfaces/zone';
import { ZoneType } from '../../models/enums';
import { useAppSelector } from '../../store';
import { getNeighbourhoodCenters, getSelectedId } from '../../selectors';

export function NeighbourhoodOverlay(feat: INeighbourhood) {
  let zoneOptions = [ZoneType.RESIDENTIAL, ZoneType.RESIDENTIAL_LOW, ZoneType.RESIDENTIAL_MID_HIGH, ZoneType.MIXED_USE];
  const [value, setValue] = useState(ZoneType.RESIDENTIAL_LOW);
  const neighId = feat.properties.id;
  const dispatch = useAppDispatch();
  const location = useAppSelector(getNeighbourhoodCenters)[neighId];
  const selectedId = useAppSelector(getSelectedId);
  const name = feat.properties.name;
  const id = feat.properties.id;
  const percentSfh = (feat.properties.singleFamilyCount / feat.properties.residenceCount) * 100;
  const percentSfhStr = percentSfh.toPrecision(4);
  const color = perc2color(percentSfh);
  const density = feat.properties.density.toPrecision(5);
  // const markerRef = useRef<L.Marker>(null);
  // const popRef = useRef<L.Popup>(null);

  const onChange = (event: SelectChangeEvent) => {
    const temp = { neighbourhoodId: event.target.name, newZoning: event.target.value };
    dispatch(updateUserSetZoning(temp));
    type key = keyof typeof ZoneType;
    setValue(ZoneType[event.target.value as key]);
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
        // setIsOpen(true);
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     markerRef.current?.fire('click', null, true);
  //     markerRef.current?.openPopup();
  //   }
  // }, [isOpen]);

  function createItemList(option: ZoneType){
    return <MenuItem value={option}>{humanize(option)}</MenuItem>
  }

  // TODO: make marker smaller
  function CreateMarker() {
    return (
    <Marker position={location}>
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
              {zoneOptions.map((option) => createItemList(option))}
            </Select>
          </FormControl>
        </Box>
      </Popup>
    </Marker>
    )
  }

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
        {selectedId === neighId ? <CreateMarker /> : null}
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
