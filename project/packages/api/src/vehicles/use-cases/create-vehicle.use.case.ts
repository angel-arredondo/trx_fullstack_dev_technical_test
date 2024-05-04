import { CreateVehicleDto, VehicleRepository } from "../domain";
import { VehicleUseCase, newVehicle } from "./vehicle.use-case";


export class CreateVehicleUseCase implements VehicleUseCase {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}
    async execute(vehicleDto: CreateVehicleDto): Promise<newVehicle> {
        const vehicle = await this.vehicleRepository.create(vehicleDto);
        const { manufacturer, vin } = vehicle;
        return {
            manufacturer,
            vin
        }
    }
}