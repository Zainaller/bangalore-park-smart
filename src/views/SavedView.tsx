
import React from 'react';
import Layout from '../components/Layout';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { Bookmark } from 'lucide-react';

const SavedView: React.FC = () => {
  // For demo, we'll just show 3 random spots as "saved"
  const savedSpots = mockParkingSpots.slice(2, 5);
  
  return (
    <Layout title="Saved Spots" showBackButton>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Bookmark className="text-purple-600 mr-2" />
          <h1 className="text-xl font-semibold text-park-blue-800">Saved Spots</h1>
        </div>
        <p className="text-park-gray-600">Your favorite parking locations</p>
      </div>
      
      {savedSpots.length > 0 ? (
        <div className="space-y-4">
          {savedSpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-park-gray-600">No saved parking spots yet</p>
          <p className="text-park-gray-500 mt-2">Tap the bookmark icon on any parking spot to save it</p>
        </div>
      )}
    </Layout>
  );
};

export default SavedView;
