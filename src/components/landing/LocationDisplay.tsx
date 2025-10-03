'use client';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LocationDisplay() {
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use a reverse geocoding service.
          // For this simulation, we'll use a representative name.
          setLocation('Bay of Bengal Region');
        },
        (error) => {
          setLocation('Location access denied');
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocation('Location not available');
    }
  }, []);

  return (
    <div className="absolute top-5 right-5 z-20 text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-lg">
      <MapPin className="h-4 w-4 text-primary" />
      <span>{location}</span>
    </div>
  );
}
