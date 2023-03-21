import { MapContainer, ZoomControl } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { createPopup } from './popup';
import { Dispatch, SetStateAction } from 'react';

export interface MapProps {
    parentSizeRef: any;
    setZone: Dispatch<SetStateAction<string>>;
    zoneVar: string;
}

export function Map(props: MapProps) {
  return (
    <MapContainer
      ref={props.parentSizeRef}
      center={[43.6529, -79.3849]}
      zoom={12}
      zoomControl={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {createPopup(props)}
    </MapContainer>
  );
}
