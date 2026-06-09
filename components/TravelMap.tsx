'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Trip } from '@/lib/data';

// Leaflet 기본 마커 아이콘 경로 보정 (번들러에서 깨지는 이슈)
if (typeof window !== 'undefined') {
  // @ts-expect-error - private property workaround
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

export default function TravelMap({ trips }: { trips: Trip[] }) {
  const center: [number, number] = trips.length
    ? [
        trips.reduce((s, t) => s + t.lat, 0) / trips.length,
        trips.reduce((s, t) => s + t.lng, 0) / trips.length,
      ]
    : [36.5, 127.8];

  return (
    <div style={{ height: 480, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trips.map(t => (
          <Marker key={t.id} position={[t.lat, t.lng]}>
            <Popup>
              <div style={{ fontFamily: 'Pretendard, system-ui, sans-serif', minWidth: 160 }}>
                <div style={{ fontWeight: 700, color: '#0A2540', fontSize: 14 }}>{t.title}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                  {t.date} · {t.location}
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: '#444' }}>
                  {t.highlights.slice(0, 2).join(' · ')}
                </div>
                <div style={{ marginTop: 4, fontSize: 12 }}>
                  {'⭐'.repeat(t.rating)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
