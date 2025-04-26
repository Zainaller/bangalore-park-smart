import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../contexts/NavigationContext';
import { Car, Shield, Clock, MapPin, CircleParking, LogIn, UserPlus, Route, ParkingMeter } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface StatCardProps {
  number: string;
  label: string;
}
const StatCard: React.FC<StatCardProps> = ({
  number,
  label
}) => {
  return <div className="text-center p-6 bg-primary/5 rounded-2xl hover:shadow-md hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>;
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  isActive: boolean;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  imageSrc,
  isActive
}) => {
  return <Card className={`overflow-hidden transition-all duration-500 hover:shadow-lg group ${isActive ? 'ring-2 ring-primary/20' : ''}`}>
      <div className="h-48 overflow-hidden">
        <img src={imageSrc} alt={title} className="" />
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
    </Card>;
};

interface StepCardProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
  animation: 'fade-left' | 'fade-right' | 'fade-up';
  isActive: boolean;
}
const StepCard: React.FC<StepCardProps> = ({
  icon,
  step,
  title,
  description,
  animation,
  isActive
}) => {
  return <div className={`flex flex-col items-center text-center space-y-4 transition-all duration-500 ${isActive ? 'transform translate-y-[-8px]' : 'hover:transform hover:translate-y-[-8px]'}`}>
      <div className="relative">
        <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary/20 scale-110' : ''}`}>
          {icon}
        </div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold transition-transform duration-300 ${isActive ? 'scale-125' : ''}`}>
          {step}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>;
};

const GuestHome: React.FC = () => {
  const { navigateTo } = useNavigation();
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const cityImages = [{
    src: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=2000",
    title: "Smart Parking in Bengaluru",
    subtitle: "Find perfect spots in the Silicon Valley of India"
  }, {
    src: "https://images.unsplash.com/photo-1584456929142-8a073521a064?q=80&w=2000",
    title: "Beat the Bengaluru Traffic",
    subtitle: "Pre-book parking spots and save time"
  }, {
    src: "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?q=80&w=2000",
    title: "Secure Parking Solutions",
    subtitle: "Premium spots at top locations across the city"
  }];

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollArea className="h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center space-y-12 py-8 px-4 pb-16">
        <div className="w-full max-w-6xl mx-auto relative">
          <Carousel className="w-full" setApi={setCarouselApi}>
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
                        <p className="text-lg opacity-90 mb-6">{image.subtitle}</p>
                        <div className="flex flex-wrap gap-4 mt-4">
                          <Button 
                            size="lg" 
                            onClick={() => navigateTo('auth', { tab: 'signup' })} 
                            className="bg-primary text-primary-foreground group relative overflow-hidden"
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Sign Up Free
                            <span className="absolute inset-0 bg-white/20 group-hover:translate-y-0 -translate-y-full transition-transform duration-300"></span>
                          </Button>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            onClick={() => navigateTo('auth', { tab: 'login' })} 
                            className="border-white/40 text-white group"
                          >
                            <LogIn className="mr-2 h-4 w-4" />
                            <span className="group-hover:scale-110 transition-transform duration-300 inline-flex items-center">
                              Log In
                            </span>
                          </Button>
                        </div>
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

        <div className="text-center space-y-6 max-w-2xl mx-auto relative">
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
              onClick={() => navigateTo('auth', { tab: 'signup' })} 
              className="bg-primary text-primary-foreground group relative overflow-hidden"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
              <span className="absolute inset-0 bg-white/20 group-hover:translate-y-0 -translate-y-full transition-transform duration-300"></span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <FeatureCard 
            icon={<Car className="text-primary w-8 h-8" />} 
            title="Smart Booking" 
            description="Book parking spots instantly with our intelligent reservation system" 
            imageSrc="https://images.unsplash.com/photo-1603899309484-dd6a5a361b31?q=80&w=2000" 
            isActive={activeFeature === 0} 
          />
          <FeatureCard 
            icon={<Shield className="text-primary w-8 h-8" />} 
            title="Secure Payments" 
            description="Your transactions are protected with bank-level security" 
            imageSrc="https://images.unsplash.com/photo-1607004468138-e7e23ea26947?q=80&w=2000" 
            isActive={activeFeature === 1} 
          />
          <FeatureCard 
            icon={<Clock className="text-primary w-8 h-8" />} 
            title="24/7 Access" 
            description="Find and book parking spots anytime, anywhere" 
            imageSrc="https://images.unsplash.com/photo-1508029392317-134e36de4486?q=80&w=2000" 
            isActive={activeFeature === 2} 
          />
        </div>

        <div className="w-full max-w-6xl bg-gradient-to-br from-slate-900/40 to-primary/5 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold text-white">3D Map Layout</h2>
              <p className="text-gray-300">
                Experience next-generation parking with our interactive 3D mall maps. Navigate complex parking structures with ease and find the perfect spot.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-300">Real-time spot availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Route className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-300">Turn-by-turn navigation to your spot</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <ParkingMeter className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-gray-300">Multiple floor visualization</span>
                </div>
              </div>
              <Button 
                onClick={() => navigateTo('search')} 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Explore Available Spots
              </Button>
            </div>
            <div className="relative min-h-[400px] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000" 
                alt="3D Mall Parking Map" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent">
                <div className="absolute w-8 h-8 top-1/4 left-1/3">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-8 w-8 bg-primary"></div>
                </div>
                <div className="absolute w-8 h-8 bottom-1/3 right-1/4">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></div>
                  <div className="relative inline-flex rounded-full h-8 w-8 bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full max-w-6xl bg-gradient-to-br from-background/80 to-primary/5 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <CircleParking className="text-primary w-6 h-6 mr-2" />
                <h3 className="text-lg font-semibold">ParkIt</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Making parking smarter in Bengaluru, one spot at a time.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Smart Booking</li>
                <li>Real-time Availability</li>
                <li>Secure Payments</li>
                <li>24/7 Support</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ParkIt Bengaluru. All rights reserved.
          </div>
        </footer>
      </div>
    </ScrollArea>
  );
};

export default GuestHome;
