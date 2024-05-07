import { ApiVehicleEntity, CreateVehicleDto, PaginationVehicle, VehicleRepository } from "../../domain";
import { GetAllVehiclesDto } from "../../domain/dtos/get-all-vehicles.dto";
import { HttpClientAdapter } from "../../../adapters/http-client.adapter";
import { PutDeleteVehicleDto } from "../../domain/dtos/put-delete-vehicle.dto";

export class TraxiApiVehicleRepository implements VehicleRepository {
    async delete(deleteVehicleDto: PutDeleteVehicleDto): Promise<void> {
        await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles/${deleteVehicleDto.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
    }
    
    async put(
        putDeleteVehicleDto: PutDeleteVehicleDto,
        createVehicleDto: CreateVehicleDto
    ): Promise<ApiVehicleEntity> {
        const result = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles/${putDeleteVehicleDto.id}`,
            {
                method: "PUT",
                body: JSON.stringify(createVehicleDto),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return result;
    }

    async getAll(
        getAllVehiclesDto: GetAllVehiclesDto
    ): Promise<PaginationVehicle> {
        const { page, limit } = getAllVehiclesDto;

        const vehicles = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles?limit=${limit}&page=${page}`
        );

        return vehicles;

    }

    async create(createVehicleDto: CreateVehicleDto): Promise<ApiVehicleEntity> {
        const result = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles/create`,
            {
                method: "POST",
                body: JSON.stringify(createVehicleDto),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return result;
    }

}