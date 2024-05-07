import { useContext } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { VehicleContext, VehicleContextType } from "../context/vehicle.context";
import { useGeoRoutes } from "../hooks/useGeoRoutes";
import car from "../assets/car.svg";
import greenCar from "../assets/selectedCar.svg";
import L from "leaflet";

export const Map = () => {
  const { paginatedVehicles, selectedVehicle, setSelectedVehicle } =
    useContext<VehicleContextType>(VehicleContext);

  const { geoRoutes, isLoading, error } = useGeoRoutes();

  const CarIcon = L.icon({
    iconUrl: car,
    iconSize: [50, 110],
    iconAnchor: [30, 102],
    popupAnchor: [-3, -76],
  });

  const SelectedCarIcon = L.icon({
    iconUrl: greenCar,
    iconSize: [60, 120],
    iconAnchor: [30, 110],
    popupAnchor: [-3, -76],
  });

  return (
    <MapContainer center={[19.43344, -99.133348]} zoom={15}>
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />

      {!isLoading &&
        !error &&
        geoRoutes.map((geoRoute) => (
          <Polyline
            key={geoRoute.id}
            positions={
              geoRoute.coordinates.map((latlng) => latlng.reverse()) as any
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
            icon={
              selectedVehicle?.id === vehicle.id ? SelectedCarIcon : CarIcon
            }
            zIndexOffset={selectedVehicle?.id === vehicle.id ? 10 : 0}
            riseOnHover={true}
            eventHandlers={{
              click: () => {
                setSelectedVehicle(vehicle);
              },
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
