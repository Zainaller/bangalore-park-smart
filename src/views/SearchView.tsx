
import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { Filter, MapPin, SortAsc } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '../hooks/use-mobile';

const SearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'price' | 'distance' | 'availability'>('distance');
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Filter parking spots based on search query
  const filteredSpots = useMemo(() => {
    if (!searchQuery) return mockParkingSpots;
    
    return mockParkingSpots.filter(spot => 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  // Sort parking spots based on the selected option
  const sortedSpots = useMemo(() => {
    return [...filteredSpots].sort((a, b) => {
      if (sortOption === 'price') {
        return a.hourlyRate - b.hourlyRate;
      } else if (sortOption === 'availability') {
        return b.availableSpots - a.availableSpots;
      }
      // Default sort by "distance" (for demo, we'll use the id ordering)
      return 0;
    });
  }, [filteredSpots, sortOption]);

  const scrollAreaHeight = isMobile ? 'h-[calc(100vh-280px)]' : 'h-[calc(100vh-260px)]';
  
  return (
    <Layout title="Search Parking" showBackButton={true}>
      <div className="mb-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search for locations, malls, areas..."
        />
      </div>
      
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-2 mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-primary border border-border/50 rounded-full px-4 py-1.5"
        >
          <Filter size={16} className="mr-1.5" />
          <span>Filters</span>
        </button>
        
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button 
            onClick={() => setSortOption('distance')}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
              sortOption === 'distance' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground'
            }`}
          >
            Nearest
          </button>
          
          <button 
            onClick={() => setSortOption('price')}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
              sortOption === 'price' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground'
            }`}
          >
            Price
          </button>
          
          <button 
            onClick={() => setSortOption('availability')}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
              sortOption === 'availability' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-foreground'
            }`}
          >
            Available
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-secondary/50 rounded-lg p-4 mb-4 border border-border/50">
          <h3 className="font-medium mb-2">Filter Options</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-primary" />
              <span>24/7 Access</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-primary" />
              <span>CCTV</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-primary" />
              <span>EV Charging</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-primary" />
              <span>Covered Parking</span>
            </label>
          </div>
          
          <div className="mt-3">
            <label className="block text-sm mb-1">Maximum Price (₹/hr)</label>
            <input type="range" min="0" max="200" step="10" className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹0</span>
              <span>₹100</span>
              <span>₹200</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <p className="text-muted-foreground text-sm">
          <MapPin size={16} className="inline mr-1" /> 
          Showing {sortedSpots.length} parking spots
        </p>
      </div>
      
      <ScrollArea className={`${scrollAreaHeight} pr-4`}>
        <div className="space-y-4 pb-4">
          {sortedSpots.map(spot => (
            <ParkingSpotCard key={spot.id} spot={spot} />
          ))}
          
          {sortedSpots.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No parking spots found for "{searchQuery}"</p>
              <p className="text-muted-foreground text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default SearchView;
