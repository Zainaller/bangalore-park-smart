
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../contexts/NavigationContext';
import { Car, Shield, Clock, MapPin, CreditCard, PhoneCall, CircleParking, KeyRound, MapPinCheck, LogIn, UserPlus } from 'lucide-react';
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
  
  // Use higher quality, more modern-looking parking images
  const cityImages = [
    {
      src: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=2000",
      title: "Smart Parking in Bengaluru",
      subtitle: "Find perfect spots in the Silicon Valley of India"
    },
    {
      src: "https://images.unsplash.com/photo-1584456929142-8a073521a064?q=80&w=2000",
      title: "Beat the Bengaluru Traffic",
      subtitle: "Pre-book parking spots and save time"
    },
    {
      src: "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?q=80&w=2000",
      title: "Secure Parking Solutions",
      subtitle: "Premium spots at top locations across the city"
    }
  ];

  // Auto-scroll carousel
  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselApi]);

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
        {/* Hero Section with Dynamic Image Carousel and prominent CTAs */}
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
                        
                        {/* Hero CTA buttons */}
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
            imageSrc="https://images.unsplash.com/photo-1603899309484-dd6a5a361b33?q=80&w=2000"
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

        {/* Bengaluru specific section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Parking in Bengaluru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden h-80 relative group">
              <img 
                src="https://images.unsplash.com/photo-1576721843264-5375e54e2f49?q=80&w=2000" 
                alt="Modern parking structure" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Traffic Solutions</h3>
                <p className="text-white/90">Bengaluru is known for its traffic congestion. ParkIt helps you navigate the city more efficiently by ensuring your parking is sorted.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden h-80 relative group">
              <img 
                src="https://images.unsplash.com/photo-1611806616581-65903ea68ac0?q=80&w=2000" 
                alt="Tech city parking" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Tech City Parking</h3>
                <p className="text-white/90">As India's Silicon Valley, Bengaluru deserves smart parking solutions. ParkIt brings tech-enabled convenience to your daily commute.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced: Interactive Map & AR Experience Section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Parking Reinvented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-primary/10 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-700"></div>
              <div className="h-48 mb-4 overflow-hidden rounded-lg relative">
                <img 
                  src="https://images.unsplash.com/photo-1551544931-49dbf9a76618?q=80&w=2000" 
                  alt="3D Parking Map" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-primary/80 text-xs font-medium rounded-full text-white">NEW FEATURE</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">3D Parking Maps</h3>
              <p className="text-muted-foreground mb-4">Visualize parking structures with our interactive 3D maps to find the perfect spot before you arrive.</p>
              <div className="flex space-x-2">
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Real-time</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Interactive</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">3D View</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-primary/10 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-700"></div>
              <div className="h-48 mb-4 overflow-hidden rounded-lg relative">
                <img 
                  src="https://images.unsplash.com/photo-1511300961358-669ca3ad05af?q=80&w=2000" 
                  alt="AR Parking Guide" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-purple-500/80 text-xs font-medium rounded-full text-white">COMING SOON</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">AR Navigation</h3>
              <p className="text-muted-foreground mb-4">Our upcoming AR feature will guide you to your parking spot with virtual arrows and real-time directions.</p>
              <div className="flex space-x-2">
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Augmented Reality</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Turn-by-turn</span>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Voice Guide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced: Data-driven Parking Insights Section */}
        <div className="w-full max-w-5xl">
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/40 to-primary/5 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Smart City Insights</h2>
                <p className="text-gray-300 mb-6">
                  Our AI analyzes traffic patterns and parking availability across Bengaluru to provide you with the most efficient parking options.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Predict parking availability with 94% accuracy",
                    "Save up to 40 minutes on your daily commute",
                    "Reduce carbon emissions by minimizing idle driving",
                    "Access historical data to plan future trips"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-primary/20 p-1 rounded-full mr-3 mt-1">
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => navigateTo('auth')} 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity w-full md:w-auto"
                >
                  Join the Smart Parking Revolution
                </Button>
              </div>
              <div className="lg:col-span-3 relative min-h-[400px]">
                <img 
                  src="https://images.unsplash.com/photo-1556139943-4bdca53adf1e?q=80&w=2000" 
                  alt="Smart city data visualization" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/30 to-transparent"></div>
                
                {/* Animated data points */}
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-primary/80 rounded-full animate-pulse"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 12 + 4}px`,
                      height: `${Math.random() * 12 + 4}px`,
                      animationDuration: `${Math.random() * 4 + 2}s`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
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
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => navigateTo('auth', { tab: 'signup' })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigateTo('auth', { tab: 'login' })}
                className="border-primary/30 hover:border-primary transition-colors"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
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
