
import React from 'react';
import Layout from '../components/Layout';
import { useNavigation } from '../contexts/NavigationContext';
import { useBooking } from '../contexts/BookingContext';
import { mockParkingSpots } from '../data/parkingData';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Clock, MapPin, Download, Share2 } from 'lucide-react';

const ConfirmationView: React.FC = () => {
  const { bookingId, navigateTo } = useNavigation();
  const { getBookingById } = useBooking();
  
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  
  if (!booking) {
    return (
      <Layout title="Booking Confirmation" showBackButton={true}>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-park-gray-500">Booking not found</p>
          <Button 
            onClick={() => navigateTo('home')}
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Find the parking spot for this booking
  const spot = mockParkingSpots.find(s => s.id === booking.parkingId);
  
  if (!spot) {
    return (
      <Layout title="Booking Confirmation" showBackButton={true}>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-park-gray-500">Parking spot not found</p>
          <Button 
            onClick={() => navigateTo('home')}
            className="mt-4"
          >
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleGoHome = () => {
    navigateTo('home');
  };
  
  return (
    <Layout className="pb-16">
      <div className="flex flex-col items-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-park-blue-900 mb-1">Booking Confirmed!</h1>
        <p className="text-park-gray-600 mb-6">Your parking spot is reserved</p>
        
        <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-md mb-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="font-semibold text-lg text-park-blue-800">{spot.name}</h2>
            <span className="text-lg font-bold text-park-blue-700">₹{booking.totalAmount}</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin size={18} className="text-park-gray-500 mr-2 flex-shrink-0" />
              <span className="text-park-gray-700">{spot.address}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar size={18} className="text-park-gray-500 mr-2 flex-shrink-0" />
              <span className="text-park-gray-700">
                {booking.startTime.toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short'
                })}
              </span>
            </div>
            
            <div className="flex items-center">
              <Clock size={18} className="text-park-gray-500 mr-2 flex-shrink-0" />
              <span className="text-park-gray-700">
                {booking.startTime.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })} - {booking.endTime.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-5 mb-8">
          <h3 className="text-center font-semibold mb-4">Scan this QR code at entry</h3>
          
          <div className="flex justify-center mb-4">
            <img 
              src={booking.qrCode}
              alt="Booking QR Code"
              className="w-48 h-48"
            />
          </div>
          
          <div className="text-center text-sm text-park-gray-500">
            <p>Booking ID: {booking.id.substring(0, 8).toUpperCase()}</p>
            <p className="mt-1">Valid until {booking.endTime.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}</p>
          </div>
        </div>
        
        <div className="flex w-full max-w-md space-x-3">
          <Button 
            variant="outline" 
            className="flex-1 border-park-blue-200"
          >
            <Download size={16} className="mr-2" />
            Save QR
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 border-park-blue-200"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button 
          onClick={handleGoHome}
          className="w-full bg-park-blue-700 hover:bg-park-blue-800 text-white"
        >
          Done
        </Button>
      </div>
    </Layout>
  );
};

export default ConfirmationView;
