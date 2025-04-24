
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../contexts/NavigationContext';
import { Car, Shield, Clock, MapPin, CreditCard, PhoneCall } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';

const GuestHome: React.FC = () => {
  const { navigateTo } = useNavigation();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center space-y-12 py-8 px-4">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight`}>
          Find Your Perfect Parking Spot
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Discover and reserve convenient parking spots in seconds with ParkIt
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigateTo('auth')}
            className="bg-primary text-primary-foreground"
          >
            Get Started
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigateTo('search')}
          >
            Browse Spots
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <FeatureCard
          icon={<Car className="text-primary w-8 h-8" />}
          title="Easy Booking"
          description="Quick and simple parking spot reservations with just a few clicks"
        />
        <FeatureCard
          icon={<Shield className="text-primary w-8 h-8" />}
          title="Secure Payments"
          description="Safe and protected transactions for your peace of mind"
        />
        <FeatureCard
          icon={<Clock className="text-primary w-8 h-8" />}
          title="24/7 Access"
          description="Find and book parking spots anytime, day or night"
        />
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={<MapPin className="w-8 h-8" />}
            step="1"
            title="Find a Spot"
            description="Search for available parking spots in your desired location"
          />
          <StepCard
            icon={<CreditCard className="w-8 h-8" />}
            step="2"
            title="Book & Pay"
            description="Select your spot and complete the secure payment process"
          />
          <StepCard
            icon={<PhoneCall className="w-8 h-8" />}
            step="3"
            title="Park & Go"
            description="Use the app to access your spot and start parking"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 w-full py-12 px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary">Ready to Start Parking Smarter?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who have simplified their parking experience with ParkIt
          </p>
          <Button 
            size="lg"
            onClick={() => navigateTo('auth')}
            className="bg-primary text-primary-foreground"
          >
            Create Free Account
          </Button>
        </div>
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
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="pt-6 text-center space-y-4">
        <div className="flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface StepCardProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, step, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default GuestHome;

