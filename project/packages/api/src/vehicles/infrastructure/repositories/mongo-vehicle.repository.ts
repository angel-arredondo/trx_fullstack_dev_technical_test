import { VehicleModel } from "../../../data/mongodb/models/vehicle.model";
import { CustomError } from "../../../utils/custom-error.util";
import { CreateVehicleDto, VehicleEntity, VehicleRepository } from "../../domain";
import { VehicleMapper } from "../vehicle.mapper";


export class MongoVehicleRepository implements VehicleRepository{
    async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
        try{
            const newVehicle = await VehicleModel.create(createVehicleDto);
            await newVehicle.save();
            return VehicleMapper.vehicleEntityFromObject(newVehicle);
        } catch (error){
            if(error instanceof Error)
                throw CustomError.internalServer(error.message);

            throw error
        }
      
    }

}