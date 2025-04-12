
import React from 'react';
import Layout from '../components/Layout';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { MapPin } from 'lucide-react';

const NearbyView: React.FC = () => {
  // For demo purposes, we'll just show all parking spots and pretend they're nearby
  const nearbySpots = mockParkingSpots;
  
  return (
    <Layout title="Nearby Parking" showBackButton>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <MapPin className="text-park-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-park-blue-800">Parking Near You</h1>
        </div>
        <p className="text-park-gray-600">Find convenient parking spots close to your current location</p>
      </div>
      
      {nearbySpots.length > 0 ? (
        <div className="space-y-4">
          {nearbySpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-park-gray-600">No nearby parking spots found</p>
        </div>
      )}
    </Layout>
  );
};

export default NearbyView;
