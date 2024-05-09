import { VehicleUseCase } from "./vehicle.use-case";
import { ApiVehicleEntity, VehicleRepository, CreateVehicleDto, PutDeleteVehicleDto } from "../domain";


export class PutVehicleUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}
    async execute(
        putDeleteVehicleDto: PutDeleteVehicleDto, 
        createVehicleDto:CreateVehicleDto
    ): Promise<ApiVehicleEntity> {
        return await this.vehicleRepository.put(
            putDeleteVehicleDto, 
            createVehicleDto
        );
    }
}