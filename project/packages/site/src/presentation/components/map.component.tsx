import { useContext, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import {
  VehicleContext,
  VehicleContextType,
} from "../vehicles/context/vehicle.context";
import { useGeoRoutes } from "../geo-routes/hooks/fetch-geo-routes.hook";
import whiteVehicle from "../vehicles/assets/white-vehicle.svg";
import greenVehicle from "../vehicles/assets/green-vehicle.svg";
import L from "leaflet";

export const Map = () => {
  const { paginatedVehicles, selectedVehicle, setSelectedVehicle } =
    useContext<VehicleContextType>(VehicleContext);

  const { geoRoutes, isLoading, error } = useGeoRoutes();

  const CarIcon = L.icon({
    iconUrl: whiteVehicle,
    iconSize: [50, 110],
    iconAnchor: [30, 102],
    popupAnchor: [-3, -76],
  });

  const SelectedCarIcon = L.icon({
    iconUrl: greenVehicle,
    iconSize: [60, 120],
    iconAnchor: [30, 102],
    popupAnchor: [-3, -76],
  });

  return (
    <MapContainer center={[19.43344, -99.133348]} zoom={15}>
      <TileLayer
        url={import.meta.env.VITE_LEAFLET_URL}
      />

      {!isLoading &&
        !error &&
        geoRoutes.map((geoRoute) => (
          <Polyline
            key={geoRoute.id}
            positions={
              geoRoute.coordinates.map((latlng) => {
                if (latlng[0] < 0) return latlng.reverse();
                return latlng;
              }) as any
            }
            pathOptions={{ color: geoRoute.color }}
          />
        ))}

      {paginatedVehicles?.vehicles.map((vehicle) => {
        if (vehicle.position[0] < 0) vehicle.position.reverse();
        return (
          <Marker
            key={vehicle.id}
            position={vehicle.position as LatLngExpression}
            icon={selectedVehicle === vehicle.id ? SelectedCarIcon : CarIcon}
            zIndexOffset={selectedVehicle === vehicle.id ? 14 : 0}
            riseOnHover={true}
            eventHandlers={{
              click: () => setSelectedVehicle(vehicle.id)
            }}
          >
            <Popup>
              <li>
                <span>Status: </span>
                {vehicle.status}
              </li>
              <li>
                <span>Lat: </span>
                {vehicle.position[0]}
              </li>
              <li>
                <span>Lon: </span>
                {vehicle.position[1]}
              </li>
              <li>
                <span>Vin: </span>
                {vehicle.vin}
              </li>
              <li>
                <span>Marca: </span>
                {vehicle.manufacturer}
              </li>
              <li>
                <span>Modelo: </span>
                {vehicle.model}
              </li>
              <li>
                <span>Color: </span>
                {vehicle.color}
              </li>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
