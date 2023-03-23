import { MapContainer, ZoomControl } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { createPopup } from './popup';
import { Dispatch, SetStateAction } from 'react';
import { Submit } from '../buttons/submit';

export interface MapProps {
  setZone: Dispatch<SetStateAction<string>>;
  zoneVar: string;
}

export function Map(props: MapProps) {
  return (
    <MapContainer center={[43.6529, -79.3849]} zoom={12} zoomControl={false} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Submit />
      <ZoomControl position="topright" />
      {createPopup(props)}
    </MapContainer>
  );
}
