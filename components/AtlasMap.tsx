'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import { places, type Place } from '@/lib/data';
import { useAtlas } from '@/lib/atlas-context';

// Cinematic CARTO dark tiles (free, no API key)
const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';
const LABEL_URL =
  'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png';

function buildPinIcon(p: Place, selected: boolean): L.DivIcon {
  const mods: string[] = ['atlas-pin'];
  if (p.favorite) mods.push('atlas-pin-favorite');
  if (p.status === 'planned') mods.push('atlas-pin-planned');
  if (p.isSecret) mods.push('atlas-pin-secret');
  if (selected) mods.push('atlas-pin-selected');
  return L.divIcon({
    className: '',
    html: `<div class="${mods.join(' ')}">
              <div class="atlas-pin-ring"></div>
              <div class="atlas-pin-dot"></div>
            </div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function FlyTo({ id }: { id: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!id) return;
    const p = places.find(x => x.id === id);
    if (!p) return;
    map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 9), {
      duration: 1.3,
      easeLinearity: 0.25,
    });
  }, [id, map]);
  return null;
}

export default function AtlasMap() {
  const { selectedId, select } = useAtlas();

  const center = useMemo<[number, number]>(() => {
    const visible = places.filter(p => !p.isSecret);
    if (!visible.length) return [36.5, 127.8];
    const lat = visible.reduce((s, p) => s + p.lat, 0) / visible.length;
    const lng = visible.reduce((s, p) => s + p.lng, 0) / visible.length;
    return [lat, lng];
  }, []);

  const routePoints = useMemo<[number, number][]>(
    () =>
      places
        .filter(p => !p.isSecret && p.status !== 'planned')
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(p => [p.lat, p.lng]),
    []
  );

  return (
    <div className="absolute inset-0">
      <MapContainer
        center={center}
        zoom={7}
        zoomControl={true}
        scrollWheelZoom={false}
        attributionControl={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={TILE_URL}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
        />
        <TileLayer url={LABEL_URL} subdomains="abcd" />

        <Polyline
          positions={routePoints}
          pathOptions={{
            color: '#C4A661',
            weight: 1.4,
            opacity: 0.75,
            dashArray: '4 8',
          }}
        />

        {places.map(p => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={buildPinIcon(p, p.id === selectedId)}
            eventHandlers={{
              click: () => select(p.id),
            }}
          />
        ))}

        <FlyTo id={selectedId} />
      </MapContainer>
    </div>
  );
}
