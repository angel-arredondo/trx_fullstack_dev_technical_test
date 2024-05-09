import { useState } from "react";
import { VehicleEntity, CreateVehicleDto, PutDeleteVehicleDto } from "../../../vehicles/domain";
import { TraxiApiVehicleRepository } from "../../../vehicles/infrastructure/repositories/traxi-api-vehicle.repository";
import { PutVehicleUseCase } from "../../../vehicles/use-cases/put-vehicle.use-case";
import { CustomError } from "../../../utils/custom-errors.util";


export const usePutVehicle = () => {
    const [result, setResult] = useState<VehicleEntity>();
    const [error, setError] = useState<Error>();
    const [isLoading, setisLoading] = useState(false);

    const putVehicle = async (
        vehicleId:string, 
        vehicle: { [key: string]: any; }
    ) =>{
        try{
            setisLoading(true);
            const [
                putDtoError, 
                putVehicleDto
            ] = PutDeleteVehicleDto.create({id:vehicleId});
    
            if(putDtoError) 
                throw CustomError.dto(`PutVehicleDto -> ${putDtoError}`);
    
            const [
                createDtoError, 
                createVehicleDto
            ] = CreateVehicleDto.create(vehicle);
    
            if(createDtoError) 
                throw CustomError.dto(`CreateVehicleDto -> ${createDtoError}`);
                
            const traxiApiVehicleRepository = new TraxiApiVehicleRepository();
    
            const result = await new PutVehicleUseCase(
                traxiApiVehicleRepository
            ).execute(putVehicleDto!, createVehicleDto!);
    
            setResult(result);
            return result;
        } catch (error) {
            setError(error);
        } finally {
            setisLoading(false);
        }
    }

    return {
        result,
        isLoading,
        error,
        putVehicle
    }
}