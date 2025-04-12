
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import HomeView from '../views/HomeView';
import SearchView from '../views/SearchView';
import SpotDetailsView from '../views/SpotDetailsView';
import BookingView from '../views/BookingView';
import ProfileView from '../views/ProfileView';
import StaffView from '../views/StaffView';
import ConfirmationView from '../views/ConfirmationView';
import AuthView from '../views/AuthView';
import NearbyView from '../views/NearbyView';
import RecentView from '../views/RecentView';
import SavedView from '../views/SavedView';
import MyCarsView from '../views/MyCarsView';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { currentView, navigateTo } = useNavigation();
  const { user, isLoading } = useAuth();
  
  // Redirect to auth page if not logged in (except for pages that don't require auth)
  React.useEffect(() => {
    if (!isLoading && !user && 
        currentView !== 'auth' && 
        currentView !== 'home' && 
        currentView !== 'search' && 
        currentView !== 'spotDetails') {
      navigateTo('auth');
    }
  }, [currentView, user, isLoading, navigateTo]);
  
  // Render the correct view based on the navigation context
  switch (currentView) {
    case 'home':
      return <HomeView />;
    
    case 'search':
      return <SearchView />;
    
    case 'spotDetails':
      return <SpotDetailsView />;
    
    case 'booking':
      return <BookingView />;
    
    case 'profile':
      return <ProfileView />;
    
    case 'staff':
      return <StaffView />;
    
    case 'confirmation':
      return <ConfirmationView />;
      
    case 'auth':
      return <AuthView />;
      
    case 'nearby':
      return <NearbyView />;
      
    case 'recent':
      return <RecentView />;
      
    case 'saved':
      return <SavedView />;
      
    case 'myCars':
      return <MyCarsView />;
    
    default:
      return <HomeView />;
  }
};

export default Index;
