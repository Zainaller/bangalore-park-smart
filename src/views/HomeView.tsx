
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GuestHome from '../components/GuestHome';
import SearchBar from '../components/SearchBar';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Clock, Bookmark, Car } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '../hooks/use-mobile';

const HomeView: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout title="ParkIt">
      {user ? <AuthenticatedHome /> : <GuestHome />}
    </Layout>
  );
};

const AuthenticatedHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateTo } = useNavigation();
  const isMobile = useIsMobile();
  
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
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          ParkIt
        </h1>
        <p className="text-muted-foreground text-lg">Find and reserve parking spots instantly</p>
        
        <div className="mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
        <QuickAccessButton 
          icon={<MapPin size={isMobile ? 20 : 24} />} 
          label="Nearby" 
          color="bg-blue-600/20" 
          bgColor="bg-blue-950/40"
          onClick={() => navigateTo('nearby')}
        />
        <QuickAccessButton 
          icon={<Clock size={isMobile ? 20 : 24} />} 
          label="Recent" 
          color="bg-gray-600/20"
          bgColor="bg-gray-900/40"
          onClick={() => navigateTo('recent')}
        />
        <QuickAccessButton 
          icon={<Bookmark size={isMobile ? 20 : 24} />} 
          label="Saved" 
          color="bg-purple-600/20"
          bgColor="bg-purple-950/40"
          onClick={() => navigateTo('saved')}
        />
        <QuickAccessButton 
          icon={<Car size={isMobile ? 20 : 24} />} 
          label="My Cars" 
          color="bg-amber-600/20"
          bgColor="bg-amber-950/40"
          onClick={() => navigateTo('myCars')}
        />
      </div>

      <ScrollArea className={isMobile ? "h-[calc(100vh-300px)]" : "h-[calc(100vh-280px)]"}>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Nearby Parking</h2>
          <div className="space-y-3">
            {nearbySpots.map(spot => (
              <ParkingSpotCard key={spot.id} spot={spot} compact={true} />
            ))}
          </div>
        </section>
        
        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Popular Spots</h2>
          <div className="space-y-4">
            {popularSpots.map(spot => (
              <ParkingSpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        </section>
      </ScrollArea>
    </>
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
  const isMobile = useIsMobile();
  
  return (
    <button 
      className="flex flex-col items-center justify-center rounded-lg transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className={`${bgColor} rounded-full p-2 md:p-3 mb-1 md:mb-2 flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-14 h-14'}`}>
        <div className={`${color} text-white`}>{icon}</div>
      </div>
      <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-foreground`}>{label}</span>
    </button>
  );
};

export default HomeView;
