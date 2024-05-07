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
        router.put('/:id', vehicleController.putVehicle);
        router.delete('/:id', vehicleController.deleteVehicle);

        return router;
    }
}