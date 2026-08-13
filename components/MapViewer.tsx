"use client";

import dynamic from "next/dynamic";
import { MapLocation } from "@/lib/admin/types";

// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 animate-pulse rounded-inherit">
      <div className="flex flex-col items-center text-gray-400 gap-2">
        <span className="text-3xl">📍</span>
        <span className="text-xs font-bold uppercase tracking-wider">Memuat Peta...</span>
      </div>
    </div>
  ),
});

interface MapViewerProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function MapViewer(props: MapViewerProps) {
  return <DynamicMap {...props} />;
}
