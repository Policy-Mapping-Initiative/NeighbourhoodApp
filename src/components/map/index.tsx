import { MapContainer, ZoomControl } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { Dispatch, SetStateAction } from 'react';
import { Submit } from '../buttons/submit';
import { useAppSelector } from '../../store';
import { getNeighbourhoods } from '../../selectors';
import { NeighbourhoodOverlay } from './popup';

export interface MapProps {
  setZone: Dispatch<SetStateAction<string>>;
  zoneVar: string;
}

export function Map() {
  const neighbours = useAppSelector(getNeighbourhoods);

  return (
    <MapContainer center={[43.6529, -79.3849]} zoom={12} zoomControl={false} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Submit />
      {neighbours && neighbours.features?.map(elem => NeighbourhoodOverlay(elem))}
      <ZoomControl position="topright" />
    </MapContainer>
  );
}
