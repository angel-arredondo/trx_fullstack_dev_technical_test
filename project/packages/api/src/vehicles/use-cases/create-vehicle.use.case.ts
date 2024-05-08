import { CreateVehicleDto, VehicleEntity, VehicleRepository } from "../domain";
import { VehicleUseCase } from "./vehicle.use-case";


export class CreateVehicleUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}
    async execute(vehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
        return await this.vehicleRepository.create(vehicleDto);
    }
}