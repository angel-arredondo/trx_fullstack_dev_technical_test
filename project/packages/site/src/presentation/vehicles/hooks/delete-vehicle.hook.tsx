import { useState } from "react"
import { PutDeleteVehicleDto } from "../../../vehicles/domain";
import { TraxiApiVehicleRepository } from "../../../vehicles/infrastructure/repositories/traxi-api-vehicle.repository";
import { DeleteVehicleUseCase } from "../../../vehicles/use-cases/delete-vehicle.use-case";
import { CustomError } from "../../../utils/custom-errors.util";


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
            if(error) throw CustomError.dto(`DeleteVehicleDto -> ${error}`);

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