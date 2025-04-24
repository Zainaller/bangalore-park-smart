
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
  
  // Calculate availability percentage and status
  const availabilityPercentage = (spot.availableSpots / spot.totalSpots) * 100;
  
  let availabilityStatus = '';
  let statusColor = '';
  
  if (availabilityPercentage > 50) {
    availabilityStatus = 'High Availability';
    statusColor = 'bg-green-500';
  } else if (availabilityPercentage > 20) {
    availabilityStatus = 'Moderate';
    statusColor = 'bg-yellow-500';
  } else {
    availabilityStatus = 'Low Availability';
    statusColor = 'bg-red-500';
  }
  
  if (compact) {
    return (
      <div 
        onClick={handleClick}
        className="glass-morphism p-4 rounded-lg cursor-pointer hover:bg-secondary/20 transition-all duration-200"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-primary">{spot.name}</h3>
          <Badge variant="outline" className="text-primary">₹{spot.hourlyRate}/hr</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{spot.address}</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs flex items-center text-muted-foreground">
            <span className={`w-2 h-2 rounded-full ${statusColor} mr-1`}></span>
            {spot.availableSpots} spots left
          </span>
          <span className="text-xs flex items-center text-amber-400">
            <Star size={14} className="mr-1" />
            {spot.rating}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      onClick={handleClick}
      className="glass-morphism rounded-lg overflow-hidden cursor-pointer hover:bg-secondary/20 transition-all duration-200 animate-fade-in"
    >
      <div className="h-40 relative">
        <img 
          src={spot.images[0]} 
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
          ₹{spot.hourlyRate}/hr
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{spot.name}</h3>
        
        <div className="flex items-center text-muted-foreground mt-2">
          <MapPin size={16} className="mr-2" />
          <span className="text-sm">{spot.address}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mt-2">
          <Clock size={16} className="mr-2" />
          <span className="text-sm">{spot.openingHours.open} - {spot.openingHours.close}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></span>
            <span className="text-sm text-muted-foreground">{availabilityStatus}</span>
          </div>
          
          <div className="flex items-center text-amber-400">
            <Star size={16} className="mr-1" />
            <span className="text-sm">{spot.rating} ({spot.reviews})</span>
          </div>
        </div>
        
        <div className="mt-4 bg-secondary/50 rounded-lg p-3 text-sm">
          <span className="text-primary">{spot.availableSpots}</span>
          <span className="text-muted-foreground"> of {spot.totalSpots} spots available</span>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
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
