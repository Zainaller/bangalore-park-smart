
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigation } from '../contexts/NavigationContext';
import { useBooking } from '../contexts/BookingContext';
import { mockParkingSpots } from '../data/parkingData';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CreditCard, Timer, CheckCircle2, AlertCircle, Car } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '../hooks/use-toast';

const BookingView: React.FC = () => {
  const { selectedSpotId, navigateTo } = useNavigation();
  const { createBooking } = useBooking();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hours, setHours] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Find the selected parking spot
  const spot = mockParkingSpots.find(s => s.id === selectedSpotId);
  
  if (!spot) {
    return (
      <Layout title="Booking" showBackButton={true}>
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
  
  const handlePayNow = () => {
    if (!paymentMethod) {
      toast({
        title: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const startTime = new Date(selectedDate);
      const endTime = new Date(selectedDate);
      endTime.setHours(endTime.getHours() + hours);
      
      const booking = createBooking(spot.id, startTime, endTime, spot.hourlyRate);
      
      setIsProcessing(false);
      navigateTo('confirmation', { bookingId: booking.id });
    }, 1500);
  };
  
  const totalAmount = spot.hourlyRate * hours;
  
  return (
    <Layout title="Complete Booking" showBackButton={true} className="pb-20">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="font-semibold text-park-blue-800 text-lg mb-2">{spot.name}</h2>
        <p className="text-park-gray-600 text-sm">{spot.address}</p>
        
        <div className="flex items-center mt-2 text-sm text-park-gray-500">
          <Clock size={14} className="mr-1" />
          <span>
            Open {spot.openingHours.open} - {spot.openingHours.close}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-medium text-park-blue-700 mb-3">Booking Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar size={18} className="text-park-gray-500 mr-2" />
              <span>Date</span>
            </div>
            <div className="font-medium">
              {selectedDate.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Timer size={18} className="text-park-gray-500 mr-2" />
              <span>Duration</span>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => hours > 1 && setHours(hours - 1)}
                className="w-7 h-7 rounded-md bg-park-gray-100 flex items-center justify-center"
                disabled={hours <= 1}
              >
                -
              </button>
              
              <span className="mx-3 font-medium">{hours} {hours === 1 ? 'hour' : 'hours'}</span>
              
              <button 
                onClick={() => setHours(hours + 1)}
                className="w-7 h-7 rounded-md bg-park-gray-100 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Car size={18} className="text-park-gray-500 mr-2" />
              <span>Vehicle</span>
            </div>
            <div className="font-medium">
              <Badge className="bg-park-blue-100 text-park-blue-800 hover:bg-park-blue-200">
                + Add Vehicle
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-medium text-park-blue-700 mb-3">Payment Method</h3>
        
        <div className="space-y-2">
          <PaymentOption
            name="Google Pay"
            icon="G" // In a real app, use proper icons
            isSelected={paymentMethod === 'gpay'}
            onSelect={() => setPaymentMethod('gpay')}
          />
          
          <PaymentOption
            name="PhonePe"
            icon="P"
            isSelected={paymentMethod === 'phonepe'}
            onSelect={() => setPaymentMethod('phonepe')}
          />
          
          <PaymentOption
            name="Paytm"
            icon="₹"
            isSelected={paymentMethod === 'paytm'}
            onSelect={() => setPaymentMethod('paytm')}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-medium text-park-blue-700 mb-3">Price Details</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-park-gray-600">Base Fare (₹{spot.hourlyRate} x {hours}hr)</span>
            <span>₹{spot.hourlyRate * hours}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-park-gray-600">Platform Fee</span>
            <span>₹0</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-park-gray-600">GST</span>
            <span>₹0</span>
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-park-blue-800">₹{totalAmount}</span>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-park-gray-600">Total</div>
          <div className="text-xl font-bold text-park-blue-800">₹{totalAmount}</div>
        </div>
        
        <Button 
          onClick={handlePayNow}
          className="w-full bg-park-blue-700 hover:bg-park-blue-800 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </Layout>
  );
};

interface PaymentOptionProps {
  name: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ name, icon, isSelected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
        isSelected 
          ? 'bg-park-blue-50 border border-park-blue-200' 
          : 'bg-white border border-park-gray-200'
      }`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-park-gray-100 flex items-center justify-center mr-3 text-lg font-bold">
          {icon}
        </div>
        <span className="font-medium">{name}</span>
      </div>
      
      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        isSelected 
          ? 'border-park-blue-500 bg-park-blue-500' 
          : 'border-park-gray-300'
      }`}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
      </div>
    </div>
  );
};

export default BookingView;
