import { CreateVehicleDto } from "../domain";

export interface newVehicle {
    manufacturer: string;
    vin: string;
}

export abstract class VehicleUseCase {
    abstract execute(vehicleDto: CreateVehicleDto): Promise<newVehicle>;
}