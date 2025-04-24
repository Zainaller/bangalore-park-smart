
import React from 'react';
import Layout from '../components/Layout';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { MapPin } from 'lucide-react';

const NearbyView: React.FC = () => {
  // For demo purposes, we'll just show all parking spots and pretend they're nearby
  const nearbySpots = mockParkingSpots;
  
  return (
    <Layout title="ParkIt" showBackButton>
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <MapPin className="text-primary mr-2" size={24} />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Nearby Spots
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">Find convenient parking near you</p>
      </div>
      
      {nearbySpots.length > 0 ? (
        <div className="space-y-4">
          {nearbySpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 rounded-lg bg-secondary/50">
          <p className="text-muted-foreground">No nearby parking spots found</p>
        </div>
      )}
    </Layout>
  );
};

export default NearbyView;
