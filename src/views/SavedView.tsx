
import React from 'react';
import Layout from '../components/Layout';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { Bookmark } from 'lucide-react';

const SavedView: React.FC = () => {
  // For demo, we'll just show 3 random spots as "saved"
  const savedSpots = mockParkingSpots.slice(2, 5);
  
  return (
    <Layout title="ParkIt" showBackButton>
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <Bookmark className="text-primary mr-2" size={24} />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Saved Spots
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">Your favorite parking locations</p>
      </div>
      
      {savedSpots.length > 0 ? (
        <div className="space-y-4">
          {savedSpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 rounded-lg bg-secondary/50">
          <p className="text-muted-foreground">No saved parking spots yet</p>
          <p className="text-sm text-muted-foreground/80 mt-2">
            Tap the bookmark icon on any parking spot to save it
          </p>
        </div>
      )}
    </Layout>
  );
};

export default SavedView;
