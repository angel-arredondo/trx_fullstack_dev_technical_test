import { PaginationVehicle, VehicleEntity, VehicleRepository } from "../domain";
import { VehicleUseCase } from "./vehicle.use-case";
import { GetAllVehiclesDto } from "../domain/dtos/get-all-vehicles.dto";


export class GetAllVehiclesUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}

    async execute(
        getAllVehiclesDto: GetAllVehiclesDto
    ): Promise<PaginationVehicle> {
        return await this.vehicleRepository.getAll(getAllVehiclesDto);
    }
}