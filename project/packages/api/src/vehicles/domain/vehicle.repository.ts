import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { VehicleEntity } from "./entities/vehicle.entity";


export abstract class VehicleRepository {
    abstract create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity>;
}