
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../contexts/NavigationContext';
import { Car, Shield, Clock, MapPin, CreditCard, PhoneCall, CircleParking, KeyRound, MapPinCheck } from 'lucide-react';
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
  const [activeFeature, setActiveFeature] = useState<number>(0);
  
  const cityImages = [
    {
      src: "https://images.unsplash.com/photo-1587047515797-76670c85310b?q=80&w=2070",
      title: "Smart Parking in Bengaluru",
      subtitle: "Find perfect spots in the Silicon Valley of India"
    },
    {
      src: "https://images.unsplash.com/photo-1598633919372-a08bb5ed7abd?q=80&w=2070",
      title: "Beat the Bengaluru Traffic",
      subtitle: "Pre-book parking spots and save time"
    },
    {
      src: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=2070",
      title: "Secure Parking Solutions",
      subtitle: "Premium spots at top locations across the city"
    }
  ];

  // Auto rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Animation for stats
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    spots: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const userInterval = setInterval(() => {
            setAnimatedStats(prev => ({
              ...prev,
              users: Math.min(prev.users + 1000, 50000)
            }));
          }, 30);
          
          const spotInterval = setInterval(() => {
            setAnimatedStats(prev => ({
              ...prev,
              spots: Math.min(prev.spots + 20, 1000)
            }));
          }, 30);
          
          const satisfactionInterval = setInterval(() => {
            setAnimatedStats(prev => ({
              ...prev,
              satisfaction: Math.min(prev.satisfaction + 2, 98)
            }));
          }, 30);
          
          return () => {
            clearInterval(userInterval);
            clearInterval(spotInterval);
            clearInterval(satisfactionInterval);
          };
        }
      },
      { threshold: 0.1 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => {
      if (statsElement) observer.unobserve(statsElement);
    };
  }, []);

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center space-y-12 py-8 px-4 pb-16">
        {/* Hero Section with Dynamic Image Carousel */}
        <div className="w-full max-w-6xl mx-auto">
          <Carousel className="w-full" autoplay>
            <CarouselContent>
              {cityImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
                    <img 
                      src={image.src} 
                      alt={image.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
                        <p className="text-lg opacity-90">{image.subtitle}</p>
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
        <div className="text-center space-y-6 max-w-2xl mx-auto relative">
          {/* Adding a subtle glowing effect */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center justify-center">
            <CircleParking className="text-primary w-10 h-10 mr-2" />
            <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent leading-tight`}>
              ParkIt Bengaluru
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Join thousands of Bengaluru drivers who save time and reduce stress with ParkIt's intelligent parking solutions
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigateTo('auth')}
              className="bg-primary text-primary-foreground group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 group-hover:translate-y-0 -translate-y-full transition-transform duration-300"></span>
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigateTo('search')}
              className="group"
            >
              <span className="group-hover:scale-110 transition-transform duration-300 inline-flex items-center">
                Browse Spots <MapPinCheck className="ml-2 w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>

        {/* Statistics Section with animation */}
        <div id="stats-section" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <StatCard number={animatedStats.users.toLocaleString()} label="Happy Users" />
          <StatCard number={animatedStats.spots.toLocaleString()} label="Parking Spots" />
          <StatCard number={`${animatedStats.satisfaction}%`} label="Satisfaction Rate" />
        </div>

        {/* Features Grid with animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <FeatureCard
            icon={<Car className="text-primary w-8 h-8" />}
            title="Smart Booking"
            description="Book parking spots instantly with our intelligent reservation system"
            imageSrc="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070"
            isActive={activeFeature === 0}
          />
          <FeatureCard
            icon={<Shield className="text-primary w-8 h-8" />}
            title="Secure Payments"
            description="Your transactions are protected with bank-level security"
            imageSrc="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=2070"
            isActive={activeFeature === 1}
          />
          <FeatureCard
            icon={<Clock className="text-primary w-8 h-8" />}
            title="24/7 Access"
            description="Find and book parking spots anytime, anywhere"
            imageSrc="https://images.unsplash.com/photo-1617391765934-f7ac7aa648bc?q=80&w=2070"
            isActive={activeFeature === 2}
          />
        </div>

        {/* Bengaluru specific section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Parking in Bengaluru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden h-80 relative group">
              <img 
                src="https://images.unsplash.com/photo-1587047515797-76670c85310b?q=80&w=2070" 
                alt="Bengaluru streets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Traffic Solutions</h3>
                <p className="text-white/90">Bengaluru is known for its traffic congestion. ParkIt helps you navigate the city more efficiently by ensuring your parking is sorted.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-80 relative group">
              <img 
                src="https://images.unsplash.com/photo-1598633919372-a08bb5ed7abd?q=80&w=2070" 
                alt="Bengaluru skyline" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Tech City Parking</h3>
                <p className="text-white/90">As India's Silicon Valley, Bengaluru deserves smart parking solutions. ParkIt brings tech-enabled convenience to your daily commute.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section with interactive animation */}
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              icon={<MapPin className="w-8 h-8" />}
              step="1"
              title="Find a Spot"
              description="Search for available parking spots in your desired location"
              animation="fade-right"
              isActive={activeFeature === 3}
            />
            <StepCard
              icon={<CreditCard className="w-8 h-8" />}
              step="2"
              title="Book & Pay"
              description="Select your spot and complete the secure payment process"
              animation="fade-up"
              isActive={activeFeature === 4}
            />
            <StepCard
              icon={<KeyRound className="w-8 h-8" />}
              step="3"
              title="Park & Go"
              description="Use the app to access your spot and start parking"
              animation="fade-left"
              isActive={activeFeature === 5}
            />
          </div>
        </div>

        {/* Interactive map section */}
        <div className="w-full max-w-5xl relative">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Find Spots Near You</h2>
          <div className="h-96 rounded-xl overflow-hidden border border-border/50 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
              <div className="text-center p-6 rounded-lg">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="mb-4 text-muted-foreground">Find and book parking spots throughout Bengaluru</p>
                <Button 
                  onClick={() => navigateTo('auth')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign in to explore
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -z-10 blur-3xl opacity-20 w-full h-full">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 w-full py-16 px-4 rounded-3xl relative overflow-hidden">
          <div className="absolute -z-10 inset-0">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <CircleParking className="text-primary w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-primary">Ready to Start Parking Smarter?</h2>
            <p className="text-lg text-muted-foreground">
              Join our community of smart parkers and make parking hassles a thing of the past
            </p>
            <Button 
              size="lg"
              onClick={() => navigateTo('auth')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
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
    <div className="text-center p-6 bg-primary/5 rounded-2xl hover:shadow-md hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
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
  isActive: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, imageSrc, isActive }) => {
  return (
    <Card className={`overflow-hidden transition-all duration-500 hover:shadow-lg group ${isActive ? 'ring-2 ring-primary/20' : ''}`}>
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
        />
      </div>
      <CardContent className="pt-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className={`p-3 rounded-full bg-primary/10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            {icon}
          </div>
        </div>
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
  isActive: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ icon, step, title, description, animation, isActive }) => {
  return (
    <div className={`flex flex-col items-center text-center space-y-4 transition-all duration-500 ${
      isActive ? 'transform translate-y-[-8px]' : 'hover:transform hover:translate-y-[-8px]'
    }`}>
      <div className="relative">
        <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-primary/20 scale-110' : ''
        }`}>
          {icon}
        </div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold transition-transform duration-300 ${
          isActive ? 'scale-125' : ''
        }`}>
          {step}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default GuestHome;
