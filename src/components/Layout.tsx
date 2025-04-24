
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Home, Search, Ticket, UserCircle } from 'lucide-react';

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
  
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container px-4 py-4 flex items-center">
          {showBackButton && (
            <button 
              onClick={goBack}
              className="mr-3 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-medium text-primary">{title}</h1>
          )}
        </div>
      </header>
      
      <main className="flex-1 container px-4 py-4 pb-24 overflow-hidden">
        {children}
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-background/80 border-t border-border/50">
        <div className="container px-4 py-2 flex justify-around">
          <NavButton icon={<Home size={20} />} label="Home" view="home" />
          <NavButton icon={<Search size={20} />} label="Search" view="search" />
          {user && <NavButton icon={<Ticket size={20} />} label="Bookings" view="booking" />}
          <NavButton icon={<UserCircle size={20} />} label="Profile" view="profile" />
        </div>
      </footer>
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
  
  const isActive = currentView === view;
  
  return (
    <button 
      onClick={() => navigateTo(view)}
      className={`flex flex-col items-center p-1 transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <span className="text-xl mb-0.5">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
};

export default Layout;
