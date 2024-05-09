import { VehicleEntity, CreateVehicleDto, VehicleRepository } from "../domain";
import { VehicleUseCase } from "./vehicle.use-case";


export class CreateVehicleUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}

    async execute(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
        return await this.vehicleRepository.create(createVehicleDto);
    }
}