import { Router } from "express";
import { VehicleController } from "./vehicle.controller";
import { VehicleRepository } from "../../../vehicles/domain";

export class VehicleRoutes {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}

     getRoutes(): Router {
        const router = Router(); 
        const vehicleController = new VehicleController(this.vehicleRepository);

        router.post('/create', vehicleController.createVehicle);
        router.get('/', vehicleController.getAllVehicles);

        return router;
    }
}