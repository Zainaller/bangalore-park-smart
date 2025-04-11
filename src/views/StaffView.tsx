
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { ScanLine, User, Check, X, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '../hooks/use-toast';

const StaffView: React.FC = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBooking, setScannedBooking] = useState<any | null>(null);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning a QR code
    setTimeout(() => {
      setIsScanning(false);
      
      const mockBooking = {
        id: 'booking-' + Date.now(),
        user: {
          name: 'Rahul Sharma',
          phone: '+91 98765 43210',
        },
        parkingSpot: 'Phoenix MarketCity',
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours later
        valid: true
      };
      
      setScannedBooking(mockBooking);
    }, 2000);
  };
  
  const handleApprove = () => {
    toast({
      title: 'Booking Approved',
      description: 'Customer check-in successful',
      variant: 'default',
    });
    
    setScannedBooking(null);
  };
  
  const handleReject = () => {
    toast({
      title: 'Booking Rejected',
      description: 'Customer check-in denied',
      variant: 'destructive',
    });
    
    setScannedBooking(null);
  };
  
  return (
    <Layout title="Staff Portal">
      <div className="flex flex-col items-center">
        <div className="bg-park-blue-900 text-white p-5 rounded-lg shadow-lg mb-6 w-full">
          <h1 className="text-xl font-bold mb-1">Staff Portal</h1>
          <p className="text-sm text-park-blue-200">Phoenix MarketCity Parking</p>
          
          <div className="mt-4 flex justify-between">
            <div>
              <div className="text-park-blue-200 text-xs">Available Spots</div>
              <div className="text-2xl font-bold">45</div>
            </div>
            
            <div>
              <div className="text-park-blue-200 text-xs">Total Check-ins Today</div>
              <div className="text-2xl font-bold">145</div>
            </div>
          </div>
        </div>
        
        {!scannedBooking ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-xl font-semibold text-park-blue-800 mb-2">Scan Customer QR Code</h2>
              <p className="text-park-gray-500">Verify customer bookings for entry</p>
            </div>
            
            <div 
              className={`w-64 h-64 border-2 rounded-lg flex items-center justify-center mb-8 ${
                isScanning ? 'border-park-teal-500 animate-pulse-light' : 'border-park-gray-300'
              }`}
            >
              {isScanning ? (
                <div className="text-center">
                  <ScanLine size={48} className="text-park-teal-500 mx-auto mb-3" />
                  <p className="text-park-gray-600">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <ScanLine size={48} className="text-park-gray-400 mx-auto mb-3" />
                  <p className="text-park-gray-500">QR Scanner</p>
                </div>
              )}
            </div>
            
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-park-blue-700 text-white"
              size="lg"
            >
              {isScanning ? 'Scanning...' : 'Scan QR Code'}
            </Button>
            
            <div className="mt-8">
              <Button variant="outline" className="text-park-blue-700 border-park-blue-300">
                Enter Booking ID Manually
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-5 animate-fade-in">
            <div className="flex justify-between items-start mb-5">
              <h2 className="text-lg font-semibold text-park-blue-800">Booking Details</h2>
              <Badge className={scannedBooking.valid ? 'bg-green-500' : 'bg-red-500'}>
                {scannedBooking.valid ? 'Valid' : 'Invalid'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="w-10 h-10 bg-park-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="text-park-blue-700" size={20} />
                </div>
                <div>
                  <div className="font-medium">{scannedBooking.user.name}</div>
                  <div className="text-sm text-park-gray-500">{scannedBooking.user.phone}</div>
                </div>
              </div>
              
              <div className="flex items-center py-1">
                <MapPin size={18} className="text-park-gray-400 mr-2" />
                <div>{scannedBooking.parkingSpot}</div>
              </div>
              
              <div className="bg-park-gray-50 p-3 rounded-lg">
                <div className="text-sm text-park-gray-500 mb-1">Booking Time</div>
                <div className="font-medium">
                  {scannedBooking.startTime.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })} - {scannedBooking.endTime.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
              
              <div className="bg-park-blue-50 p-3 rounded-lg">
                <div className="text-sm text-park-blue-700 mb-1">Booking ID</div>
                <div className="font-mono font-medium">{scannedBooking.id.substring(0, 10).toUpperCase()}</div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <Button 
                  onClick={handleReject}
                  variant="outline" 
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X size={18} className="mr-1" />
                  Reject
                </Button>
                
                <Button 
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check size={18} className="mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StaffView;
