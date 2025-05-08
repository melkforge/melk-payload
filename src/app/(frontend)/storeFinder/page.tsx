'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect, use } from 'react';


const MapComponent = dynamic(() => import("@/components/Map/index"));
const DropdownSelector = dynamic(() => import("@/components/DropdownSelector/index"), { ssr: false });

export default function StoreFinderPage() {
  // const [selectedItem, setSelectedItem] = useState('');

  const [locations, setLocations] = useState<any[]>([]);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);

  const handleGeocodeResult = (coords: [number, number]) => {
    setUserCoords(coords);
  }
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/locations?limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        const locations = data.docs;
        console.log(locations);
        setLocations(locations);
      })
      .catch((error) => {
        console.error('Error. Could not fetch locations:', error);
      });
  }, []);
  return (

    <div className="flex h-screen">
        {/* <div className="flex flex-col gap-4">
          <DropdownSelector selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </div> */}
        <div className="w-1/3 bg-white shadow-lg p-4 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Find a Store</h1>

          <input type="text" placeholder="Enter a location" className="w-full p-2 border border-grey-300 rounded mb-4" />

          <ul className="space-y-3 text-black" >
            {locations.map((location) => (
              <li key={location._id} className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition duration-200">
                <h2 className="text-lg font-semibold">{location.FINAL_NAME}</h2>
                <p>{location.Address_by_ID}, {location.City_by_ID}, {location.Province}</p>
              </li>
            ))}
          </ul>
        </div>


        <div className="w-2/3 h-screen">
          <div className="w-full h-full">
            <MapComponent />
          </div>
        </div>

    </div>


    
      
       
        
     
  );
}






