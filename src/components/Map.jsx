import React, { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => onMapClick?.(e.latlng),
  })
  return null
}

function makePlaceIcon({ isRated }) {
  const cls = isRated ? 'trust-place-marker is-rated' : 'trust-place-marker'
  return L.divIcon({
    className: 'trust-place-marker-wrap',
    html: `<div class="${cls}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

const Map = ({
  center = [55.042135, 82.90138],
  zoom = 14,
  onMarkerClick,
  onMapClick,
  places = [],
  routeCoords = [],
  interactive = true,
}) => {
  // Fix for default marker icons in React-Leaflet
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof L !== 'undefined') {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
      console.log('Leaflet initialized')
    }
  }, [])

  const placeIcons = useMemo(() => {
    const iconMap = new globalThis.Map()
    for (const p of places) {
      const rated = Number(p?.average_rating || 0) > 0
      iconMap.set(p.id, makePlaceIcon({ isRated: rated }))
    }
    console.log('Place icons created:', iconMap.size)
    return iconMap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places.map((p) => `${p?.id}:${p?.average_rating}`).join('|')])

  return (
    <div className="map-container" style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="leaflet-map"
        style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
        zoomControl={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        scrollWheelZoom={interactive}
        boxZoom={interactive}
        keyboard={interactive}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {interactive ? <MapEvents onMapClick={onMapClick} /> : null}
        {Array.isArray(routeCoords) && routeCoords.length > 1 ? (
          <Polyline pathOptions={{ color: '#63B389', weight: 6, opacity: 0.9 }} positions={routeCoords} />
        ) : null}
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={placeIcons.get(place.id)}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(place),
            }}
          >
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map

