"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stringify } from "qs-esm";
import { Where } from "payload";

// FILTERING FUNCTION, UNUESD FOR NOW
const getProducts = async (item: string) => {

  let formattedLocations: string[];
  let locationOBJ: any;

  const product_query: Where = {
    'product_id.product_name': {
      equals: item,
    },
  }

  let stringifiedQuery = stringify(
    {
      where: product_query,
    },
    { addQueryPrefix: true },
  )

  const product_response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product_availability${stringifiedQuery}`,
  );

  const product_data = await product_response.json();
  locationOBJ = product_data.docs;

  formattedLocations = locationOBJ.map(
    (loc: any) => `${loc.location_id.FINAL_NAME}, ${loc.location_id.Address_by_ID}, ${loc.location_id.City_by_ID}, ${loc.location_id.Province}`
  );
  console.log(formattedLocations);
}

interface MovingObject {
  id: number;
  name: string;
  coordinates: number[];
}

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const movingObjects: MovingObject[] = [
    // Define your moving objects here
  ];

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-123.1207, 49.2827],
        zoom: 10,
        maxZoom: 15,
      });

      let formattedLocations: string[];
      let locationOBJ: any;

      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/locations?limit=1000`)
        .then((res) => res.json())
        .then((data) => {
          const locations = data.docs;
          console.log(locations);
          locationOBJ = locations;
          formattedLocations = locations.map(
            (loc: any) => `${loc.FINAL_NAME}, ${loc.Address_by_ID}, ${loc.City_by_ID}, ${loc.Province}`
          );


          for (let i = 0; i < formattedLocations.length; i++) {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(formattedLocations[i] as string)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
              .then(res => res.json())
              .then(res => {
                const [longitude, latitude] = res.features[0].geometry.coordinates;

                const marker = new mapboxgl.Marker()
                  .setLngLat([longitude, latitude])
                  .setPopup(new mapboxgl.Popup().setHTML(`<div style="color: black;">${locationOBJ[i].FINAL_NAME}<br>${locationOBJ[i].Address_by_ID}<br>${locationOBJ[i].City_by_ID}<br>${locationOBJ[i].Province}</div>`))
                  .addTo(map)
              });
          }

          getProducts("Matt");

          // formattedLocations.forEach((address) => {

          //     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`)
          //         .then(res => res.json())
          //         .then(res => {
          //             const [longitude, latitude] = res.features[0].geometry.coordinates;

          //             const marker = new mapboxgl.Marker()
          //                 .setLngLat([longitude, latitude])
          //                 .setPopup(new mapboxgl.Popup().setHTML(`<h3>hello</h3>`))
          //                 .addTo(map)

          //         })
          // });

          // Add zoom controls
          map.addControl(new mapboxgl.NavigationControl(), "top-left");

        });

      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default MapComponent;