import { CreateVehicleDto, PaginatedVehicles, VehicleEntity } from "../domain";
import { GetAllVehiclesDto } from "../domain/dtos/get-all-vehicles.dto";
import { PutDeleteVehicleDto } from "../domain/dtos/put-delete-vehicle.dto";


export abstract class VehicleUseCase {
    /**
     * Executes a `vehicle` use case
     * @param vehicleDto crud params
     * @param createVehicleDto `vehicle` properties
     */
    abstract execute(
        vehicleDto: CreateVehicleDto | GetAllVehiclesDto |  PutDeleteVehicleDto,
        createVehicleDto?: CreateVehicleDto
    ): Promise<VehicleEntity | PaginatedVehicles | void>;
}