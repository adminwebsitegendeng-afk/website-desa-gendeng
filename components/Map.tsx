"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect } from "react";
import { MapLocation } from "@/lib/admin/types";

// Component to dynamically change map center
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Helper to listen to map clicks (for CMS)
function MapEvents({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function Map({ locations, center = [-7.7915, 110.3882], zoom = 16, className = "w-full h-full min-h-[400px] z-0", onMapClick }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={false}
      style={{ borderRadius: "inherit" }}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>
            <div className="p-1">
              <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase mb-1">
                {loc.category}
              </span>
              <h4 className="font-bold text-sm text-dark m-0 leading-tight">{loc.name}</h4>
              {loc.description && (
                <p className="text-xs text-medium mt-1 leading-snug">{loc.description}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      {onMapClick && <MapEvents onClick={onMapClick} />}
    </MapContainer>
  );
}
