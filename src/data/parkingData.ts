
export interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  totalSpots: number;
  availableSpots: number;
  hourlyRate: number;
  images: string[];
  amenities: string[];
  openingHours: {
    open: string;
    close: string;
  };
  rating: number;
  reviews: number;
}

export const mockParkingSpots: ParkingSpot[] = [
  {
    id: "p001",
    name: "Phoenix MarketCity",
    address: "Whitefield, Bengaluru",
    description: "Secure parking at Phoenix MarketCity Mall with CCTV surveillance and security personnel.",
    latitude: 12.9962,
    longitude: 77.6968,
    totalSpots: 120,
    availableSpots: 45,
    hourlyRate: 50,
    images: ["/placeholder.svg"],
    amenities: ["24/7 Security", "CCTV", "Covered Parking", "EV Charging"],
    openingHours: {
      open: "09:00",
      close: "22:00"
    },
    rating: 4.2,
    reviews: 156
  },
  {
    id: "p002",
    name: "Brigade Road Parking",
    address: "Brigade Road, Central Bengaluru",
    description: "Multi-level parking complex at the heart of Brigade Road shopping district.",
    latitude: 12.9719,
    longitude: 77.6186,
    totalSpots: 200,
    availableSpots: 72,
    hourlyRate: 60,
    images: ["/placeholder.svg"],
    amenities: ["Security", "CCTV", "Car Wash", "Valet"],
    openingHours: {
      open: "08:00",
      close: "23:00"
    },
    rating: 4.0,
    reviews: 211
  },
  {
    id: "p003",
    name: "Indiranagar Metro Parking",
    address: "100 Feet Road, Indiranagar",
    description: "Convenient parking adjacent to Indiranagar metro station with easy access.",
    latitude: 12.9784,
    longitude: 77.6408,
    totalSpots: 80,
    availableSpots: 12,
    hourlyRate: 40,
    images: ["/placeholder.svg"],
    amenities: ["Metro Access", "24/7 Security", "CCTV"],
    openingHours: {
      open: "06:00",
      close: "23:00"
    },
    rating: 3.8,
    reviews: 95
  },
  {
    id: "p004",
    name: "Koramangala Forum Mall",
    address: "Koramangala, Bengaluru",
    description: "Spacious underground parking at Forum Mall with direct access to shopping levels.",
    latitude: 12.9347,
    longitude: 77.6150,
    totalSpots: 150,
    availableSpots: 53,
    hourlyRate: 55,
    images: ["/placeholder.svg"],
    amenities: ["Underground Parking", "CCTV", "Mall Access", "Security"],
    openingHours: {
      open: "10:00",
      close: "22:00"
    },
    rating: 4.5,
    reviews: 187
  },
  {
    id: "p005",
    name: "Cubbon Park Underground",
    address: "Cubbon Park, MG Road",
    description: "Safe and secure parking next to Cubbon Park with easy access to MG Road.",
    latitude: 12.9766,
    longitude: 77.5993,
    totalSpots: 100,
    availableSpots: 30,
    hourlyRate: 45,
    images: ["/placeholder.svg"],
    amenities: ["Park Access", "CCTV", "Security", "Well-lit"],
    openingHours: {
      open: "06:00",
      close: "21:00"
    },
    rating: 4.1,
    reviews: 124
  },
  {
    id: "p006",
    name: "Orion East Mall Parking",
    address: "Banaswadi, Bengaluru",
    description: "Covered parking facility at Orion East Mall with ample spaces.",
    latitude: 13.0213,
    longitude: 77.6487,
    totalSpots: 90,
    availableSpots: 38,
    hourlyRate: 40,
    images: ["/placeholder.svg"],
    amenities: ["CCTV", "Security", "Covered Parking", "Electric Charging"],
    openingHours: {
      open: "10:00",
      close: "22:00"
    },
    rating: 3.9,
    reviews: 78
  }
];

export interface Booking {
  id: string;
  parkingId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled';
  qrCode: string;
  createdAt: Date;
}

export const generateQRCode = (): string => {
  // This is a placeholder - in a real app, we'd generate a proper QR code
  return `https://api.qrserver.com/v1/create-qr-code/?data=booking-${Math.random().toString(36).substring(2, 15)}&size=200x200`;
};
