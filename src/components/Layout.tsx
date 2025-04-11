
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';

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
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container px-4 py-3 flex items-center">
          {showBackButton && (
            <button 
              onClick={goBack}
              className="mr-3 p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={24} className="text-park-blue-700" />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-semibold text-park-blue-800">{title}</h1>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container px-4 py-4">
        {children}
      </main>
      
      {/* Footer/Navigation */}
      <footer className="sticky bottom-0 bg-white border-t shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
        <div className="container px-4 py-3 flex justify-around">
          <NavButton icon="home" label="Home" view="home" />
          <NavButton icon="search" label="Search" view="search" />
          <NavButton icon="ticket" label="Bookings" view="booking" />
          <NavButton icon="user" label="Profile" view="profile" />
        </div>
      </footer>
    </div>
  );
};

interface NavButtonProps {
  icon: string;
  label: string;
  view: 'home' | 'search' | 'booking' | 'profile';
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, view }) => {
  const { navigateTo, currentView } = useNavigation();
  
  const isActive = currentView === view;
  
  // Map icon names to emoji (in a real app, we'd use proper icons)
  const iconMap: Record<string, string> = {
    home: '🏠',
    search: '🔍',
    ticket: '🎫',
    user: '👤',
  };
  
  return (
    <button 
      onClick={() => navigateTo(view)}
      className={`flex flex-col items-center p-1 ${isActive ? 'text-park-teal-500' : 'text-park-gray-500'}`}
    >
      <span className="text-xl">{iconMap[icon]}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default Layout;
