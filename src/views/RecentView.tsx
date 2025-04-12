
import React from 'react';
import Layout from '../components/Layout';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { Clock } from 'lucide-react';

const RecentView: React.FC = () => {
  // For demo, we'll just show 4 random spots as "recently viewed"
  const recentSpots = mockParkingSpots.slice(0, 4);
  
  return (
    <Layout title="ParkIt" showBackButton>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Clock className="text-gray-400 mr-2" />
          <h1 className="text-xl font-semibold text-foreground">Recently Viewed</h1>
        </div>
        <p className="text-muted-foreground">Your recently viewed parking locations</p>
      </div>
      
      {recentSpots.length > 0 ? (
        <div className="space-y-4">
          {recentSpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No recently viewed parking spots</p>
        </div>
      )}
    </Layout>
  );
};

export default RecentView;
