import { useContext, useEffect, useState } from "react";
import { VehicleContext, VehicleContextType } from "../context/vehicle.context";
import { TraxiApiVehicleRepository } from "../../infrastructure/repositories/traxi-api-vehicle.repository";
import { GetAllVehiclesUseCase } from "../../use-cases/get-all-vehicles.use-case";
import { GetAllVehiclesDto } from "../../domain/dtos/get-all-vehicles.dto";

export const useFetchVehicles = () => {
    const { paginatedVehicles, setPaginatedVehicles } = useContext<VehicleContextType>(
        VehicleContext
    )
    const { paginationModel } = useContext<VehicleContextType>(
        VehicleContext
    );
    const traxiApiVehicleRepository = new TraxiApiVehicleRepository();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error>();

    const loadVehicles = async () =>{
        try{
            setIsLoading(true)
            const [error, getAllVehiclesDto] = GetAllVehiclesDto.create(paginationModel);
   
            if(error) throw Error(error);

            const paginatedVehicles = await new GetAllVehiclesUseCase(
                traxiApiVehicleRepository
            ).execute(getAllVehiclesDto);
            
            setPaginatedVehicles(paginatedVehicles);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        loadVehicles();
    },[]);

    return {
        error,
        isLoading,
        loadVehicles,
        paginatedVehicles,
    }
}