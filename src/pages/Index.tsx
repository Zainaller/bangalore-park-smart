
import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import HomeView from '../views/HomeView';
import SearchView from '../views/SearchView';
import SpotDetailsView from '../views/SpotDetailsView';
import BookingView from '../views/BookingView';
import ProfileView from '../views/ProfileView';
import StaffView from '../views/StaffView';
import ConfirmationView from '../views/ConfirmationView';

const Index = () => {
  const { currentView } = useNavigation();
  
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
    
    default:
      return <HomeView />;
  }
};

export default Index;
