'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import("@/components/Map/index"));


export default function StoreFinderPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Store Finder</h1>

   
        <div className="w-full h-[500px] rounded-md overflow-hidden shadow-md">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}






