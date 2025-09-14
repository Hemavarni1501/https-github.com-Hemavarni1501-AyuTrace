
import React from 'react';
import type { GeoLocation } from '../types';
import { MapPinIcon } from './IconComponents';

const MapPlaceholder: React.FC<{ location: GeoLocation }> = ({ location }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
         <h3 className="text-xl font-serif text-brand-green mb-4">Origin of Harvest</h3>
      </div>
      <div className="relative bg-gray-200 h-64 flex items-center justify-center">
        {/* Using a static image as a map background */}
        <img src="https://picsum.photos/seed/map/800/400" alt="Map background" className="absolute h-full w-full object-cover opacity-30" />
        <div className="relative text-center z-10 p-4 bg-white/80 rounded-lg backdrop-blur-sm">
            <MapPinIcon className="w-12 h-12 text-red-500 mx-auto" />
            <p className="mt-2 font-bold text-lg text-gray-800">{location.name}</p>
            <p className="text-sm text-gray-600">Latitude: {location.lat}, Longitude: {location.lng}</p>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
