import { ApiVehicleEntity, CreateVehicleDto, VehicleRepository } from "../domain";
import { VehicleUseCase } from "./vehicle.use-case";


export class CreateVehicleUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}

    async execute(createVehicleDto: CreateVehicleDto): Promise<ApiVehicleEntity> {
        return await this.vehicleRepository.create(createVehicleDto);
    }
}