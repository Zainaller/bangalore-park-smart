
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../contexts/NavigationContext';
import { Car, Shield, Clock, MapPin, CreditCard, PhoneCall } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GuestHome: React.FC = () => {
  const { navigateTo } = useNavigation();
  const isMobile = useIsMobile();
  
  const cityImages = [
    "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=2070",
    "https://images.unsplash.com/photo-1598633919372-a08bb5ed7abd?q=80&w=2070",
    "https://images.unsplash.com/photo-1587047515797-76670c85310b?q=80&w=2070",
  ];

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center space-y-12 py-8 px-4 pb-16">
        {/* Hero Section with Dynamic Image Carousel */}
        <div className="w-full max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {cityImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
                    <img 
                      src={image} 
                      alt={`Parking in the city ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">Smart Urban Parking</h2>
                        <p className="text-lg opacity-90">Find your perfect spot in seconds</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Hero Text Section */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight`}>
            Smart Parking for a Smarter City
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Join thousands of drivers who save time and reduce stress with ParkIt's intelligent parking solutions
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

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <StatCard number="50,000+" label="Happy Users" />
          <StatCard number="1,000+" label="Parking Spots" />
          <StatCard number="98%" label="Satisfaction Rate" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <FeatureCard
            icon={<Car className="text-primary w-8 h-8" />}
            title="Smart Booking"
            description="Book parking spots instantly with our intelligent reservation system"
            imageSrc="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070"
          />
          <FeatureCard
            icon={<Shield className="text-primary w-8 h-8" />}
            title="Secure Payments"
            description="Your transactions are protected with bank-level security"
            imageSrc="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=2070"
          />
          <FeatureCard
            icon={<Clock className="text-primary w-8 h-8" />}
            title="24/7 Access"
            description="Find and book parking spots anytime, anywhere"
            imageSrc="https://images.unsplash.com/photo-1617391765934-f7ac7aa648bc?q=80&w=2070"
          />
        </div>

        {/* How It Works Section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={<MapPin className="w-8 h-8" />}
              step="1"
              title="Find a Spot"
              description="Search for available parking spots in your desired location"
              animation="fade-right"
            />
            <StepCard
              icon={<CreditCard className="w-8 h-8" />}
              step="2"
              title="Book & Pay"
              description="Select your spot and complete the secure payment process"
              animation="fade-up"
            />
            <StepCard
              icon={<PhoneCall className="w-8 h-8" />}
              step="3"
              title="Park & Go"
              description="Use the app to access your spot and start parking"
              animation="fade-left"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 w-full py-16 px-4 rounded-3xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">Ready to Start Parking Smarter?</h2>
            <p className="text-lg text-muted-foreground">
              Join our community of smart parkers and make parking hassles a thing of the past
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
    </ScrollArea>
  );
};

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="text-center p-6 bg-primary/5 rounded-2xl">
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, imageSrc }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
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
  animation: 'fade-left' | 'fade-right' | 'fade-up';
}

const StepCard: React.FC<StepCardProps> = ({ icon, step, title, description, animation }) => {
  return (
    <div className={`flex flex-col items-center text-center space-y-4 animate-${animation}`}>
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
