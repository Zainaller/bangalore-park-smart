
import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ParkingSpotCard from '../components/ParkingSpotCard';
import { mockParkingSpots } from '../data/parkingData';
import { Filter, MapPin, SortAsc } from 'lucide-react';

const SearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'price' | 'distance' | 'availability'>('distance');
  const [showFilters, setShowFilters] = useState(false);
  
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
  
  return (
    <Layout title="Search Parking" showBackButton={true}>
      <div className="mb-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search for locations, malls, areas..."
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-park-blue-700 border border-park-blue-200 rounded-full px-4 py-1.5"
        >
          <Filter size={16} className="mr-1.5" />
          <span>Filters</span>
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setSortOption('distance')}
            className={`px-3 py-1.5 text-sm rounded-full ${
              sortOption === 'distance' 
                ? 'bg-park-blue-700 text-white' 
                : 'bg-park-gray-100 text-park-gray-700'
            }`}
          >
            Nearest
          </button>
          
          <button 
            onClick={() => setSortOption('price')}
            className={`px-3 py-1.5 text-sm rounded-full ${
              sortOption === 'price' 
                ? 'bg-park-blue-700 text-white' 
                : 'bg-park-gray-100 text-park-gray-700'
            }`}
          >
            Price
          </button>
          
          <button 
            onClick={() => setSortOption('availability')}
            className={`px-3 py-1.5 text-sm rounded-full ${
              sortOption === 'availability' 
                ? 'bg-park-blue-700 text-white' 
                : 'bg-park-gray-100 text-park-gray-700'
            }`}
          >
            Available
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-park-gray-50 rounded-lg p-4 mb-4 border border-park-gray-200">
          <h3 className="font-medium mb-2">Filter Options</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-park-teal-600" />
              <span>24/7 Access</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-park-teal-600" />
              <span>CCTV</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-park-teal-600" />
              <span>EV Charging</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-park-teal-600" />
              <span>Covered Parking</span>
            </label>
          </div>
          
          <div className="mt-3">
            <label className="block text-sm mb-1">Maximum Price (₹/hr)</label>
            <input type="range" min="0" max="200" step="10" className="w-full" />
            <div className="flex justify-between text-xs text-park-gray-500">
              <span>₹0</span>
              <span>₹100</span>
              <span>₹200</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <p className="text-park-gray-600 text-sm">
          <MapPin size={16} className="inline mr-1" /> 
          Showing {sortedSpots.length} parking spots
        </p>
      </div>
      
      <div className="space-y-4">
        {sortedSpots.map(spot => (
          <ParkingSpotCard key={spot.id} spot={spot} />
        ))}
        
        {sortedSpots.length === 0 && (
          <div className="text-center py-12">
            <p className="text-park-gray-500">No parking spots found for "{searchQuery}"</p>
            <p className="text-park-gray-400 text-sm mt-2">Try a different search term</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchView;
