import { useState } from "react"
import { PutDeleteVehicleDto } from "../../domain";
import { TraxiApiVehicleRepository } from "../../infrastructure/repositories/traxi-api-vehicle.repository";
import { DeleteVehicleUseCase } from "../../use-cases/delete-vehicle.use-case";


export const useDeleteVehicle = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error>();

    const deleteVehicle = async (vehicleId: string) => {
        try{
            setIsLoading(true);
            const [
                error, 
                deleteVehicleDto
            ] = PutDeleteVehicleDto.create({ id:vehicleId });
            if(error) throw error;

            const traxiApiVehicleRepository = new TraxiApiVehicleRepository();
            await new DeleteVehicleUseCase(
                traxiApiVehicleRepository
            ).execute(deleteVehicleDto!);

        } catch(error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        error,
        deleteVehicle,
        isLoading
    }
}