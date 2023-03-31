import { MapContainer, ZoomControl } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { Dispatch, SetStateAction, useState } from 'react';
import { Submit } from '../buttons/submit';
import { useAppSelector } from '../../store';
import { getNeighbourhoods, getZones, getNeighbourhoodMapping } from '../../selectors';
import { NeighbourhoodOverlay, ZoneOverlay } from './overlays';

export interface MapProps {
  setZone: Dispatch<SetStateAction<string>>;
  zoneVar: string;
}

export function Map() {
  const [neighbourhoodId, setNeighbourhoodId] = useState('');
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

  return (
    <MapContainer center={[43.6529, -79.3849]} zoom={12} zoomControl={false} style={{ width: '100%', height: '100%' }}>
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
