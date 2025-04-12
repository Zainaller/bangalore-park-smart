
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
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
  
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="container px-4 py-3 flex items-center">
          {showBackButton && (
            <button 
              onClick={goBack}
              className="mr-3 p-1 rounded-full hover:bg-secondary"
            >
              <ArrowLeft size={24} className="text-primary" />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-semibold text-primary">{title}</h1>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container px-4 py-4">
        {children}
      </main>
      
      {/* Footer/Navigation */}
      <footer className="sticky bottom-0 bg-background border-t border-border shadow-[0_-1px_3px_rgba(0,0,0,0.2)]">
        <div className="container px-4 py-3 flex justify-around">
          <NavButton icon={<Home size={20} />} label="Home" view="home" />
          <NavButton icon={<Search size={20} />} label="Search" view="search" />
          <NavButton icon={<Ticket size={20} />} label="Bookings" view="booking" />
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
      className={`flex flex-col items-center p-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default Layout;
