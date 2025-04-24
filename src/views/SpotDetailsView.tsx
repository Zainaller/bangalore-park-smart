
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigation } from '../contexts/NavigationContext';
import { mockParkingSpots } from '../data/parkingData';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Calendar, Star, Car, Navigation, Shield, Phone, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const SpotDetailsView: React.FC = () => {
  const { selectedSpotId, navigateTo } = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hours, setHours] = useState(1);
  
  // Find the selected parking spot
  const spot = mockParkingSpots.find(s => s.id === selectedSpotId);
  
  if (!spot) {
    return (
      <Layout title="Spot Details" showBackButton={true}>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-muted-foreground">Parking spot not found</p>
          <Button 
            onClick={() => navigateTo('home')}
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleBookNow = () => {
    const startTime = new Date(selectedDate);
    const endTime = new Date(selectedDate);
    endTime.setHours(endTime.getHours() + hours);
    
    navigateTo('booking', { spotId: spot.id });
  };
  
  return (
    <Layout showBackButton={true} className="pb-24">
      <div className="h-56 bg-background relative -mx-4 -mt-4">
        <img 
          src={spot.images[0]} 
          alt={spot.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="bg-background rounded-t-3xl -mt-6 relative z-10 shadow-lg p-5">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-primary">{spot.name}</h1>
            <Badge className="bg-primary text-primary-foreground">₹{spot.hourlyRate}/hr</Badge>
          </div>
          
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span>{spot.address}</span>
          </div>
          
          <div className="flex items-center mt-1 text-muted-foreground">
            <Clock size={16} className="mr-1 flex-shrink-0" />
            <span>Open {spot.openingHours.open} - {spot.openingHours.close}</span>
          </div>
          
          <div className="flex items-center mt-3">
            <Star size={16} fill="gold" stroke="gold" className="mr-1" />
            <span className="font-medium">{spot.rating}</span>
            <span className="text-muted-foreground ml-1">({spot.reviews} reviews)</span>
          </div>
          
          <div className="mt-5 grid grid-cols-2 gap-3">
            <InfoCard icon={<Car />} title="Capacity" value={`${spot.totalSpots} spots`} />
            <InfoCard 
              icon={<Clock />} 
              title="Available" 
              value={`${spot.availableSpots} spots`} 
              valueColor={spot.availableSpots > 10 ? "text-green-500" : "text-yellow-500"}
            />
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-primary">Description</h2>
            <p className="text-muted-foreground">{spot.description}</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-primary">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {spot.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-secondary/50">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-primary">Booking Duration</h2>
            <div className="flex justify-between items-center bg-secondary/50 rounded-lg p-3">
              <div>
                <span className="text-sm text-muted-foreground">Hours</span>
                <div className="font-medium text-primary">{hours} {hours === 1 ? 'hour' : 'hours'}</div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => hours > 1 && setHours(hours - 1)}
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center"
                  disabled={hours <= 1}
                >
                  -
                </button>
                
                <span className="font-medium w-5 text-center">{hours}</span>
                
                <button 
                  onClick={() => setHours(hours + 1)}
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="bg-secondary/50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="text-muted-foreground">Total Price</div>
                <div className="text-2xl font-bold text-primary">
                  ₹{spot.hourlyRate * hours}
                </div>
              </div>
              
              <Button 
                onClick={handleBookNow}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Book Now
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between pb-8">
            <button className="flex items-center text-primary text-sm">
              <Navigation size={16} className="mr-1" />
              Get Directions
            </button>
            
            <button className="flex items-center text-primary text-sm">
              <Phone size={16} className="mr-1" />
              Contact
            </button>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  valueColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, valueColor = "text-primary" }) => {
  return (
    <div className="bg-secondary/50 p-3 rounded-lg flex items-center">
      <div className="bg-secondary p-2 rounded-full mr-3">
        {React.cloneElement(icon as React.ReactElement, { 
          size: 20,
          className: "text-primary" 
        })}
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className={`font-medium ${valueColor}`}>{value}</div>
      </div>
    </div>
  );
};

export default SpotDetailsView;
