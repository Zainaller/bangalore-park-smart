
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { User, Clock, CreditCard, Settings, ChevronRight, LogOut, Car, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigation } from '../contexts/NavigationContext';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ProfileView: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || '');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!user) {
      navigateTo('auth');
    }
  }, [user, navigateTo]);

  if (!user || !profile) {
    return null; // Don't render anything while redirecting
  }

  const handleEditProfile = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone_number: phoneNumber,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      await refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      setOpenEditProfile(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigateTo('auth');
  };
  
  return (
    <Layout title="My Profile">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24 mb-3">
          <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
          <AvatarFallback className="bg-park-blue-100 text-park-blue-600 text-xl">
            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : <User size={40} />}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold text-park-blue-800">
          {profile.full_name || 'User'}
        </h2>
        <p className="text-park-gray-500">{user.email}</p>
        
        <Button 
          variant="outline" 
          className="mt-3 text-park-blue-700 border-park-blue-200"
          size="sm"
          onClick={() => setOpenEditProfile(true)}
        >
          Edit Profile
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <ProfileMenuItem 
          icon={<Clock size={20} className="text-amber-500" />}
          title="Booking History"
          subtitle="View your past and upcoming bookings"
          onClick={() => navigateTo('booking')}
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

        {user.email === "admin@parksmart.com" && (
          <ProfileMenuItem 
            icon={<ShieldCheck size={20} className="text-park-blue-700" />}
            title="Staff Panel"
            subtitle="Manage parking locations and bookings"
            onClick={() => navigateTo('staff')}
          />
        )}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full text-red-600 border-red-200 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut size={16} className="mr-2" />
        Log Out
      </Button>

      {/* Edit Profile Sheet */}
      <Sheet open={openEditProfile} onOpenChange={setOpenEditProfile}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={handleEditProfile}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
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
