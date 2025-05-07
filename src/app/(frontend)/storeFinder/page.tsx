'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

const MapComponent = dynamic(() => import("@/components/Map/index"));
const DropdownSelector = dynamic(() => import("@/components/DropdownSelector/index"), { ssr: false });

export default function StoreFinderPage() {
  // const [selectedItem, setSelectedItem] = useState('');
  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Store Finder</h1>

        <p className="text-gray-600">Find the nearest store to you.</p>
        {/* <div className="flex flex-col gap-4">
          <DropdownSelector selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        </div> */}
        <div className="w-full h-[500px] rounded-md overflow-hidden shadow-md">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}






