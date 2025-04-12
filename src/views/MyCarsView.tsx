
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Car, PlusCircle, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CarType {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
}

const MyCarsView: React.FC = () => {
  // Mock data for cars
  const [cars, setCars] = useState<CarType[]>([
    { id: '1', make: 'Toyota', model: 'Corolla', year: '2020', licensePlate: 'KA 01 AB 1234' },
    { id: '2', make: 'Honda', model: 'City', year: '2022', licensePlate: 'KA 02 CD 5678' },
  ]);
  
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [newCar, setNewCar] = useState({ make: '', model: '', year: '', licensePlate: '' });
  
  const addCar = () => {
    const car = {
      ...newCar,
      id: Math.random().toString(36).substr(2, 9)
    };
    setCars([...cars, car]);
    setNewCar({ make: '', model: '', year: '', licensePlate: '' });
    setIsAddCarOpen(false);
  };
  
  const removeCar = (id: string) => {
    setCars(cars.filter(car => car.id !== id));
  };
  
  return (
    <Layout title="My Vehicles" showBackButton>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Car className="text-amber-600 mr-2" />
          <h1 className="text-xl font-semibold text-park-blue-800">My Vehicles</h1>
        </div>
        <p className="text-park-gray-600">Manage your vehicles for easy parking</p>
      </div>
      
      <div className="space-y-4 mb-6">
        {cars.map(car => (
          <div 
            key={car.id} 
            className="bg-white border rounded-lg p-4 flex justify-between items-center shadow-sm"
          >
            <div>
              <h3 className="font-medium text-park-blue-800">{car.make} {car.model}</h3>
              <p className="text-park-gray-600 text-sm">{car.year} • {car.licensePlate}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeCar(car.id)}>
              <Trash2 className="h-4 w-4 text-park-gray-500" />
            </Button>
          </div>
        ))}
      </div>
      
      <Button 
        className="w-full bg-park-blue-600 hover:bg-park-blue-700"
        onClick={() => setIsAddCarOpen(true)}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Vehicle
      </Button>
      
      <Dialog open={isAddCarOpen} onOpenChange={setIsAddCarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter the details of your vehicle
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="make">Make</Label>
              <Input 
                id="make" 
                placeholder="e.g., Toyota" 
                value={newCar.make}
                onChange={(e) => setNewCar({...newCar, make: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input 
                id="model" 
                placeholder="e.g., Corolla" 
                value={newCar.model}
                onChange={(e) => setNewCar({...newCar, model: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input 
                  id="year" 
                  placeholder="e.g., 2022" 
                  value={newCar.year}
                  onChange={(e) => setNewCar({...newCar, year: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="license">License Plate</Label>
                <Input 
                  id="license" 
                  placeholder="e.g., KA 01 AB 1234" 
                  value={newCar.licensePlate}
                  onChange={(e) => setNewCar({...newCar, licensePlate: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCarOpen(false)}>Cancel</Button>
            <Button onClick={addCar}>Save Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MyCarsView;
