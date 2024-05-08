import { useState } from "react";
import { ApiVehicleEntity, CreateVehicleDto, PutDeleteVehicleDto } from "../../domain";
import { TraxiApiVehicleRepository } from "../../infrastructure/repositories/traxi-api-vehicle.repository";
import { PutVehicleUseCase } from "../../use-cases/put-vehicle.use-case";


export const usePutVehicle = () => {
    const [result, setResult] = useState<ApiVehicleEntity>();
    const [error, setError] = useState<Error>();
    const [isLoading, setisLoading] = useState(false);

    const putVehicle = async (
        vehicleId:string, 
        vehicle: { [key: string]: any; }
    ) =>{
        try{
            setisLoading(true);
            const [
                putDeleteDtoError, 
                putDeleteVehicleDto
            ] = PutDeleteVehicleDto.create({id:vehicleId});
    
            if(putDeleteDtoError) 
                throw new Error(putDeleteDtoError);
    
            const [
                createDtoError, 
                createVehicleDto
            ] = CreateVehicleDto.create(vehicle);
    
            if(createDtoError) 
                throw new Error(createDtoError);
                
            const traxiApiVehicleRepository = new TraxiApiVehicleRepository();
    
            const result = await new PutVehicleUseCase(
                traxiApiVehicleRepository
            ).execute(putDeleteVehicleDto!, createVehicleDto!);
    
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