import { PaginationModel } from "mongoose-paginate-ts";
import { CreateVehicleDto, PaginationVehicle, VehicleEntity } from "../domain";
import { GetAllVehiclesDto } from "../domain/dtos/get-all-vehicles.dto";
// import { Vehicle } from "../../data/mongodb/models/vehicle.model";

export interface newVehicle {
    manufacturer: string;
    vin: string;
}

export abstract class VehicleUseCase {
    abstract execute(
        vehicleDto: CreateVehicleDto | GetAllVehiclesDto
    ): Promise<newVehicle | PaginationVehicle>;
}