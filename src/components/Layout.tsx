
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Home, Search, Ticket, UserCircle } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import GuestNavbar from './GuestNavbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false,
  className = ""
}) => {
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Show the guest navbar for non-logged in users */}
      <GuestNavbar />
      
      {/* Only show this header for logged-in users or when backButton/title is needed */}
      {((title || showBackButton) && user) && (
        <header className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="container px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              {showBackButton && (
                <button 
                  onClick={goBack}
                  className="mr-3 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} className="text-primary" />
                </button>
              )}
              {title && (
                <h1 className="text-lg font-medium text-primary">{title}</h1>
              )}
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {/* Only show navigation for logged in users */}
      {user && (
        <footer className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-xl bg-background/80 border-t border-border/50">
          <div className="container px-4 py-2 flex justify-around">
            <NavButton icon={<Home size={isMobile ? 20 : 24} />} label="Home" view="home" />
            <NavButton icon={<Search size={isMobile ? 20 : 24} />} label="Search" view="search" />
            <NavButton icon={<Ticket size={isMobile ? 20 : 24} />} label="Bookings" view="booking" />
            <NavButton icon={<UserCircle size={isMobile ? 20 : 24} />} label="Profile" view="profile" />
          </div>
        </footer>
      )}
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  view: 'home' | 'search' | 'booking' | 'profile';
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, view }) => {
  const { navigateTo, currentView } = useNavigation();
  const isMobile = useIsMobile();
  
  const isActive = currentView === view;
  
  return (
    <button 
      onClick={() => navigateTo(view)}
      className={`flex flex-col items-center p-1 transition-all ${
        isActive 
          ? 'text-primary scale-105' 
          : 'text-muted-foreground hover:text-primary/80'
      }`}
      aria-label={label}
    >
      <span className={`${isMobile ? 'text-xl' : 'text-2xl'} mb-0.5`}>{icon}</span>
      <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{label}</span>
    </button>
  );
};

export default Layout;
