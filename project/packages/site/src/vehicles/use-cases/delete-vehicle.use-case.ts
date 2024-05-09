import { PutDeleteVehicleDto, VehicleRepository } from "../domain";
import { VehicleUseCase } from "./vehicle.use-case";

export class DeleteVehicleUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}

    async execute(deleteVehicleDto: PutDeleteVehicleDto): Promise<void> {
        await this.vehicleRepository.delete(deleteVehicleDto)
    }
}