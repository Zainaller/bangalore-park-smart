
import React, { createContext, useContext, useState } from 'react';

type ViewType = 'home' | 'search' | 'spotDetails' | 'booking' | 'profile' | 'staff' | 'confirmation' | 'auth';

interface NavigationContextType {
  currentView: ViewType;
  navigateTo: (view: ViewType, params?: object) => void;
  goBack: () => void;
  getParam: (key: string) => any;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [viewHistory, setViewHistory] = useState<Array<{ view: ViewType, params: object }>>([{ view: 'home', params: {} }]);
  const [viewParams, setViewParams] = useState<object>({});

  const navigateTo = (view: ViewType, params: object = {}) => {
    setViewHistory(prev => [...prev, { view: currentView, params: viewParams }]);
    setCurrentView(view);
    setViewParams(params);
  };

  const goBack = () => {
    // Don't go back if we're at the root
    if (viewHistory.length <= 1) return;
    
    // Pop the last view from history
    const newHistory = [...viewHistory];
    const lastView = newHistory.pop() || { view: 'home', params: {} };
    
    setViewHistory(newHistory);
    setCurrentView(lastView.view);
    setViewParams(lastView.params);
  };

  const getParam = (key: string) => {
    return viewParams ? (viewParams as any)[key] : undefined;
  };

  return (
    <NavigationContext.Provider value={{ currentView, navigateTo, goBack, getParam }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
