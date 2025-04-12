
import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { useNavigation } from '../contexts/NavigationContext';
import { MapPin, Clock, Bookmark, Car } from 'lucide-react';

const HomeView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateTo } = useNavigation();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigateTo('search');
    }
  };
  
  // Get nearby parking spots (for now just use the mock data)
  const nearbySpots = mockParkingSpots.slice(0, 3);
  
  // Get popular parking spots (for now just use the mock data sorted by rating)
  const popularSpots = [...mockParkingSpots]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return (
    <Layout title="ParkIt">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-foreground">ParkIt</h1>
        <p className="text-muted-foreground mb-4">Reserve your spot in advance, guaranteed spaces</p>
        
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <QuickAccessButton 
          icon={<MapPin size={24} />} 
          label="Nearby" 
          color="bg-blue-900" 
          bgColor="bg-blue-950"
          onClick={() => navigateTo('nearby')}
        />
        <QuickAccessButton 
          icon={<Clock size={24} />} 
          label="Recent" 
          color="bg-gray-700"
          bgColor="bg-gray-900"
          onClick={() => navigateTo('recent')}
        />
        <QuickAccessButton 
          icon={<Bookmark size={24} />} 
          label="Saved" 
          color="bg-purple-300"
          bgColor="bg-purple-950" 
          onClick={() => navigateTo('saved')}
        />
        <QuickAccessButton 
          icon={<Car size={24} />} 
          label="My Cars" 
          color="bg-yellow-200"
          bgColor="bg-yellow-900"
          onClick={() => navigateTo('myCars')}
        />
      </div>
      
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-foreground">Nearby Parking</h2>
        <div className="space-y-4">
          {nearbySpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} compact={true} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-semibold mb-3 text-foreground">Popular Parking</h2>
        <div className="space-y-4">
          {popularSpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

interface QuickAccessButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
  onClick: () => void;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ icon, label, color, bgColor, onClick }) => {
  return (
    <button 
      className="flex flex-col items-center justify-center rounded-lg transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className={`${bgColor} rounded-full p-3 mb-2 flex items-center justify-center w-14 h-14`}>
        <div className={`${color} text-white`}>{icon}</div>
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </button>
  );
};

export default HomeView;
