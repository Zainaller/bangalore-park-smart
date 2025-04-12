
import React from 'react';
import { ParkingSpot } from '../data/parkingData';
import { useNavigation } from '../contexts/NavigationContext';
import { MapPin, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ParkingSpotCardProps {
  spot: ParkingSpot;
  compact?: boolean;
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({ spot, compact = false }) => {
  const { navigateTo } = useNavigation();
  
  const handleClick = () => {
    navigateTo('spotDetails', { spotId: spot.id });
  };
  
  // Calculate availability percentage
  const availabilityPercentage = (spot.availableSpots / spot.totalSpots) * 100;
  
  // Determine availability status and color
  let availabilityStatus = '';
  let statusColor = '';
  
  if (availabilityPercentage > 50) {
    availabilityStatus = 'High Availability';
    statusColor = 'bg-green-500';
  } else if (availabilityPercentage > 20) {
    availabilityStatus = 'Moderate Availability';
    statusColor = 'bg-yellow-500';
  } else {
    availabilityStatus = 'Low Availability';
    statusColor = 'bg-red-500';
  }
  
  if (compact) {
    return (
      <div 
        onClick={handleClick}
        className="bg-secondary/80 rounded-lg shadow-md p-3 mb-3 cursor-pointer hover:bg-secondary transition-all duration-200"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-primary">{spot.name}</h3>
          <Badge variant="outline" className="text-park-teal-500">₹{spot.hourlyRate}/hr</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{spot.address}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs flex items-center">
            <span className={`w-2 h-2 rounded-full ${statusColor} mr-1`}></span>
            {spot.availableSpots} spots left
          </span>
          <span className="text-xs flex items-center">
            <Star size={14} fill="gold" stroke="gold" className="mr-1" />
            {spot.rating}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      onClick={handleClick}
      className="glass-morphism rounded-lg shadow-md overflow-hidden mb-4 cursor-pointer hover:bg-secondary/20 transition-all duration-200 animate-fade-in"
    >
      <div className="h-32 bg-park-gray-200 relative">
        <img 
          src={spot.images[0]} 
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-park-blue-700">
          ₹{spot.hourlyRate}/hr
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-primary">{spot.name}</h3>
        
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin size={16} className="mr-1" />
          <span>{spot.address}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mt-1">
          <Clock size={16} className="mr-1" />
          <span>{spot.openingHours.open} - {spot.openingHours.close}</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full ${statusColor} mr-1`}></span>
            <span className="text-sm">{availabilityStatus}</span>
          </div>
          
          <div className="flex items-center">
            <Star size={16} fill="gold" stroke="gold" className="mr-1" />
            <span className="text-sm">{spot.rating} ({spot.reviews})</span>
          </div>
        </div>
        
        <div className="mt-3 bg-secondary/50 rounded p-2 text-sm">
          <span className="font-medium text-park-teal-500">{spot.availableSpots}</span> of <span>{spot.totalSpots}</span> spots available
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {spot.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {spot.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{spot.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotCard;
