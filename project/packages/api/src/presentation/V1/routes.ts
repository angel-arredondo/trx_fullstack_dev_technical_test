import { Router } from "express";
import { VehicleRoutes } from "./vehicles/vehicle.routes";
import { MongoVehicleRepository } from "../../vehicles/infrastructure/repositories/mongo-vehicle.repository";


export const API_URL = "/api/v1/";

export class AppRoutes {
  static get routes(): Router {    
    const router = Router();
    const mongoRepository = new MongoVehicleRepository();
    const vehicleRoutes = new VehicleRoutes(mongoRepository);
    
    router.use(`${API_URL}vehicles`,vehicleRoutes.getRoutes());

    return router;
  }
}