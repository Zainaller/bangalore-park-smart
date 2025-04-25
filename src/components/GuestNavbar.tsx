
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleParking, LogIn, MapPin, UserPlus } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';

const GuestNavbar: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { user } = useAuth();
  
  if (user) return null; // Don't show for logged-in users
  
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container px-4 py-3 flex items-center justify-between">
        <div className="flex items-center" onClick={() => navigateTo('home')} role="button">
          <CircleParking className="text-primary w-7 h-7 mr-2" />
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">ParkIt</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" onClick={() => navigateTo('search')} className="flex gap-1">
            <MapPin size={18} /> Explore Spots
          </Button>
          <Button onClick={() => navigateTo('auth')} variant="outline" className="border-primary/30">
            <LogIn size={16} className="mr-1" /> Log In
          </Button>
          <Button onClick={() => navigateTo('auth', { tab: 'signup' })} className="bg-primary text-white hover:bg-primary/80">
            <UserPlus size={16} className="mr-1" /> Sign Up
          </Button>
        </nav>
        
        <div className="flex md:hidden">
          <Button size="sm" variant="outline" className="mr-2 border-primary/30" onClick={() => navigateTo('auth')}>
            <LogIn size={16} /> <span className="sr-only">Login</span>
          </Button>
          <Button size="sm" className="bg-primary text-white" onClick={() => navigateTo('auth', { tab: 'signup' })}>
            <UserPlus size={16} /> <span className="sr-only">Sign up</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GuestNavbar;
