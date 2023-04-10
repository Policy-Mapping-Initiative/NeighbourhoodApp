import L from 'leaflet';
import { MapContainer, ZoomControl, useMap, TileLayer } from 'react-leaflet';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Submit } from '../submit';
import { useAppSelector } from '../../store';
import { getNeighbourhoods, getZones, getNeighbourhoodCenters, getSelectedId } from '../../selectors';
import { NeighbourhoodOverlay, ZoneOverlay } from './overlays';
import { IZone } from '../../interfaces/zone';

export interface MapProps {
  setZone: Dispatch<SetStateAction<string>>;
  zoneVar: string;
}

interface changeViewProps {
  center: L.LatLngExpression;
  zoom: number;
}

export function Map() {
  const [center, setCenter] = useState([43.6529, -79.3849] as L.LatLngExpression);
  const [zoom, setZoom] = useState(12);
  const [selectedZones, setSelectedZones] = useState([] as IZone[]);

  const neighbourhoodCenters = useAppSelector(getNeighbourhoodCenters);
  const selectedId = useAppSelector(getSelectedId);
  const neighbours = useAppSelector(getNeighbourhoods);
  const zones = useAppSelector(getZones);

  function ChangeView(props: changeViewProps) {
    const map = useMap();
    map.flyTo(props.center, props.zoom);
    return null;
  }

  useEffect(() => {
    const temp = neighbourhoodCenters[selectedId];
    if (temp) {
      setCenter(temp as L.LatLngExpression);
      setZoom(13.5);
    }
  }, [neighbourhoodCenters, selectedId]);

  useEffect(() => {
    const temp = zones.filter(elem => elem.properties.neighbourhoodId === selectedId);
    setSelectedZones(temp);
  }, [zones, selectedId]);

  return (
    <MapContainer center={center} zoom={zoom} zoomControl={false} style={{ width: '100%', height: '100%' }}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Submit />
      {neighbours && Object.values(neighbours).map(elem => NeighbourhoodOverlay(elem))}
      {selectedZones.length > 0 && selectedZones.map(elem => ZoneOverlay(elem))}
      <ZoomControl position="topright" />
    </MapContainer>
  );
}
