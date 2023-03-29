import L from 'leaflet';
import { MapContainer, ZoomControl, useMap, TileLayer } from 'react-leaflet';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Submit } from '../buttons/submit';
import { useAppSelector } from '../../store';
import {
  getNeighbourhoods,
  getZones,
  getNeighbourhoodMapping,
  getNeighbourhoodLocs,
  getSearchValue,
} from '../../selectors';
import { NeighbourhoodOverlay, ZoneOverlay } from './popup';

export interface MapProps {
  setZone: Dispatch<SetStateAction<string>>;
  zoneVar: string;
}

interface changeViewProps {
  center: L.LatLngExpression;
  zoom: number;
}

export function Map() {
  const [neighbourhoodId, setNeighbourhoodId] = useState('');
  const [center, setCenter] = useState([43.6529, -79.3849] as L.LatLngExpression);
  const [zoom, setZoom] = useState(12);
  const neighbourhoodLocs = useAppSelector(getNeighbourhoodLocs);
  const searchVal = useAppSelector(getSearchValue);
  const neighbours = useAppSelector(getNeighbourhoods);
  const neighMap = useAppSelector(getNeighbourhoodMapping);
  const zones = useAppSelector(getZones);

  // TODO: add steps to wait for the SerializableStateInvariantMiddleware
  let selectedZones = [];
  if (neighbourhoodId !== '' && Object.keys(neighMap).length > 0) {
    const zoneIds = neighMap[neighbourhoodId];
    for (let i = 0; i < zoneIds.length; i++) {
      selectedZones.push(zones[zoneIds[i]]);
    }
  }

  function ChangeView(props: changeViewProps) {
    const map = useMap();
    map.flyTo(props.center, props.zoom);
    return null;
  }

  useEffect(() => {
    if (Object.keys(neighbourhoodLocs).includes(searchVal)) {
      const temp = neighbourhoodLocs[searchVal] as L.LatLngExpression;
      setCenter(temp);
      setZoom(13.5);
    } else {
      const temp = [43.6529, -79.3849] as L.LatLngExpression;
      setCenter(temp);
      setZoom(12);
    }
  }, [searchVal, neighbourhoodLocs]);

  return (
    <MapContainer center={center} zoom={zoom} zoomControl={false} style={{ width: '100%', height: '100%' }}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Submit />
      {neighbours && neighbours.features?.map(elem => NeighbourhoodOverlay(elem, setNeighbourhoodId))}
      {selectedZones.length > 0 && selectedZones.map(elem => ZoneOverlay(elem))}
      <ZoomControl position="topright" />
    </MapContainer>
  );
}
