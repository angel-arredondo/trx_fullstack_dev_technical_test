import { 
    ApiVehicleEntity, 
    CreateVehicleDto, 
    PaginationVehicle,
    GetAllVehiclesDto,
    PutDeleteVehicleDto
} from "../domain";

export abstract class VehicleUseCase {
    /**
     * Executes a `vehicle` use case
     * @param vehicleDto crud params
     * @param createVehicleDto `vehicle` properties
     */
    abstract execute(
        vehicleDto: CreateVehicleDto | GetAllVehiclesDto | PutDeleteVehicleDto,
        createVehicleDto?: CreateVehicleDto
    ): Promise<ApiVehicleEntity | PaginationVehicle | void>;
}