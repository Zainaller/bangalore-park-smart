
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, generateQRCode } from '../data/parkingData';

interface BookingContextType {
  bookings: Booking[];
  activeBooking: Booking | null;
  createBooking: (parkingId: string, startTime: Date, endTime: Date, hourlyRate: number) => Booking;
  getBookingById: (id: string) => Booking | undefined;
  completeBooking: (id: string) => void;
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  const createBooking = (parkingId: string, startTime: Date, endTime: Date, hourlyRate: number): Booking => {
    // Calculate duration in hours
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    
    // Calculate total amount
    const totalAmount = Math.ceil(durationHours * hourlyRate);
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      parkingId,
      userId: 'current-user', // In a real app, we'd get this from auth
      startTime,
      endTime,
      totalAmount,
      status: 'confirmed',
      qrCode: generateQRCode(),
      createdAt: new Date()
    };
    
    setBookings(prev => [...prev, newBooking]);
    setActiveBooking(newBooking);
    
    return newBooking;
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  const completeBooking = (id: string): void => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: 'completed' } : booking
      )
    );
    
    if (activeBooking?.id === id) {
      setActiveBooking(null);
    }
  };

  const cancelBooking = (id: string): void => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      )
    );
    
    if (activeBooking?.id === id) {
      setActiveBooking(null);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeBooking,
        createBooking,
        getBookingById,
        completeBooking,
        cancelBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
