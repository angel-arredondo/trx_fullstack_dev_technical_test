import { useState } from "react";
import { VehicleEntity, CreateVehicleDto } from "../../../vehicles/domain";
import { TraxiApiVehicleRepository } from "../../../vehicles/infrastructure/repositories/traxi-api-vehicle.repository";
import { CreateVehicleUseCase } from "../../../vehicles/use-cases/create-vehicle.use.case";
import { CustomError } from "../../../utils/custom-errors.util";

export const useCreateVehicle = () => {
    const traxiApiVehicleRepository = new TraxiApiVehicleRepository();

    const [result, setResult] = useState<VehicleEntity>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error>();

    const createVehicle = async (vehicle: { [key: string]: any; }) => {
        try{
            setIsLoading(true);
            const [error, createVehicleDto] = CreateVehicleDto.create(vehicle);
       
            if(error) throw CustomError.dto(`CreateVehicleDto -> ${error}`);
     
            const result =  await new CreateVehicleUseCase(
                traxiApiVehicleRepository
            ).execute(createVehicleDto);
           
            setResult(result);
            return result;
        }catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        createVehicle,
        error,
        isLoading,
        result
    }
}