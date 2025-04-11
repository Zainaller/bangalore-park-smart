
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppView = 'home' | 'search' | 'spotDetails' | 'booking' | 'profile' | 'staff' | 'confirmation';

interface NavigationContextType {
  currentView: AppView;
  selectedSpotId: string | null;
  bookingId: string | null;
  navigateTo: (view: AppView, params?: { spotId?: string; bookingId?: string }) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationHistoryItem {
  view: AppView;
  spotId?: string | null;
  bookingId?: string | null;
}

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [history, setHistory] = useState<NavigationHistoryItem[]>([{ view: 'home' }]);

  const navigateTo = (view: AppView, params?: { spotId?: string; bookingId?: string }) => {
    // Add current state to history before navigating
    setHistory(prev => [...prev, { 
      view: currentView, 
      spotId: selectedSpotId,
      bookingId: bookingId
    }]);

    // Update state with new navigation
    setCurrentView(view);
    setSelectedSpotId(params?.spotId || null);
    setBookingId(params?.bookingId || null);
  };

  const goBack = () => {
    if (history.length > 1) {
      // Pop the last item as current state
      const newHistory = [...history];
      const previousState = newHistory.pop();
      
      if (previousState) {
        setCurrentView(previousState.view);
        setSelectedSpotId(previousState.spotId || null);
        setBookingId(previousState.bookingId || null);
      }
      
      setHistory(newHistory);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        selectedSpotId,
        bookingId,
        navigateTo,
        goBack
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
