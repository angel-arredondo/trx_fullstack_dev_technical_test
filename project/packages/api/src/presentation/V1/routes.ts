import { Router } from "express";
import { VehicleRoutes } from "./vehicles/vehicle.routes";
import { MongoVehicleRepository } from "../../vehicles/infrastructure/repositories/mongo-vehicle.repository";
import { LocalGeoRouteRepository } from "../../geo-routes/infrastructure/repositories/local-geo-route.repository";
import { GeoRouteRoutes } from "./geo-routes/geo-route.routes";


export const API_URL = "/api/v1/";

export class AppRoutes {
  static get routes(): Router {    
    const router = Router();
    const mongoVehicleRepository = new MongoVehicleRepository();
    const vehicleRoutes = new VehicleRoutes(mongoVehicleRepository);

    const localGeoRouteRepository = new LocalGeoRouteRepository();
    const geoRouteRoutes = new GeoRouteRoutes(localGeoRouteRepository);
    
    router.use(`${API_URL}vehicles`,vehicleRoutes.getRoutes());
    router.use(`${API_URL}georoutes`,geoRouteRoutes.getRoutes());


    return router;
  }
}