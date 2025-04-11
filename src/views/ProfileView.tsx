
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { User, Clock, CreditCard, Settings, ChevronRight, LogOut, Car } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigation } from '../contexts/NavigationContext';

const ProfileView: React.FC = () => {
  const { navigateTo } = useNavigation();
  
  return (
    <Layout title="My Profile">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-park-blue-100 rounded-full flex items-center justify-center mb-3">
          <User size={40} className="text-park-blue-600" />
        </div>
        
        <h2 className="text-xl font-bold text-park-blue-800">Rahul Sharma</h2>
        <p className="text-park-gray-500">rahul.sharma@gmail.com</p>
        
        <Button 
          variant="outline" 
          className="mt-3 text-park-blue-700 border-park-blue-200"
          size="sm"
        >
          Edit Profile
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <ProfileMenuItem 
          icon={<Clock size={20} className="text-amber-500" />}
          title="Booking History"
          subtitle="View your past and upcoming bookings"
        />
        
        <ProfileMenuItem 
          icon={<CreditCard size={20} className="text-purple-500" />}
          title="Payment Methods"
          subtitle="Manage your saved payment options"
        />
        
        <ProfileMenuItem 
          icon={<Car size={20} className="text-green-500" />}
          title="Vehicles"
          subtitle="Add or manage your vehicles"
          badge="New"
        />
        
        <ProfileMenuItem 
          icon={<Settings size={20} className="text-park-gray-500" />}
          title="Settings"
          subtitle="App settings and notifications"
        />
      </div>
      
      <Button 
        variant="outline" 
        className="w-full text-red-600 border-red-200 hover:bg-red-50"
        onClick={() => navigateTo('staff')} // For demo purposes, link to staff view
      >
        <LogOut size={16} className="mr-2" />
        Log Out
      </Button>
    </Layout>
  );
};

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  onClick?: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  badge,
  onClick 
}) => {
  return (
    <div 
      className="flex items-center p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full bg-park-gray-100 flex items-center justify-center mr-3">
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="font-medium text-park-blue-800">{title}</div>
        <div className="text-sm text-park-gray-500">{subtitle}</div>
      </div>
      
      {badge && (
        <Badge className="bg-park-blue-100 text-park-blue-700 mr-2">
          {badge}
        </Badge>
      )}
      
      <ChevronRight size={20} className="text-park-gray-400" />
    </div>
  );
};

export default ProfileView;
