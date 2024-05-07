import { useState } from "react";
import { ApiVehicleEntity, CreateVehicleDto } from "../../domain";
import { TraxiApiVehicleRepository } from "../../infrastructure/repositories/traxi-api-vehicle.repository";
import { CreateVehicleUseCase } from "../../use-cases/create-vehicle.use.case";

export const useCreateVehicle = () => {
    const traxiApiVehicleRepository = new TraxiApiVehicleRepository();

    const [result, setResult] = useState<ApiVehicleEntity>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error>();

    const createVehicle = async (vehicle: { [key: string]: any; }) => {
        try{
            setIsLoading(true);
            const [error, createVehicleDto] = CreateVehicleDto.create(vehicle);
       
            if(error) throw new Error(error);
     
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