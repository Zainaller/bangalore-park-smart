
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../contexts/NavigationContext';
import { Car, Shield, Clock } from 'lucide-react';

const GuestHome: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Welcome to ParkIt
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Find and reserve the perfect parking spot instantly
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigateTo('auth')}
            className="bg-primary text-primary-foreground"
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigateTo('search')}
          >
            Browse Spots
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <FeatureCard
          icon={<Car className="text-primary w-8 h-8" />}
          title="Easy Parking"
          description="Find and reserve parking spots with just a few taps"
        />
        <FeatureCard
          icon={<Shield className="text-primary w-8 h-8" />}
          title="Secure Booking"
          description="Safe and secure payment processing"
        />
        <FeatureCard
          icon={<Clock className="text-primary w-8 h-8" />}
          title="24/7 Access"
          description="Book parking spots anytime, anywhere"
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg glass-morphism space-y-4">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold text-center text-primary">{title}</h3>
      <p className="text-sm text-center text-muted-foreground">{description}</p>
    </div>
  );
};

export default GuestHome;
