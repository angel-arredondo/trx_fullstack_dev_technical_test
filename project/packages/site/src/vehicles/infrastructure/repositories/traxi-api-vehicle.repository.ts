import { 
    VehicleEntity, 
    CreateVehicleDto, 
    PaginatedVehiclesEntity, 
    VehicleRepository 
} from "../../domain";
import { GetAllVehiclesDto } from "../../domain/dtos/get-all-vehicles.dto";
import { HttpClientAdapter } from "../../../adapters/http-client.adapter";
import { PutDeleteVehicleDto } from "../../domain/dtos/put-delete-vehicle.dto";
import { VehicleMapper } from "../vehicle.mapper";
import { PaginatedVehiclesMapper } from "../paginated-vehicles.mapper";

export class TraxiApiVehicleRepository implements VehicleRepository {

    private readonly options: RequestInit = {
        headers: {
            "Content-Type": "application/json",
        }
    }
 
    async delete(deleteVehicleDto: PutDeleteVehicleDto): Promise<void> {
        await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles/${deleteVehicleDto.id}`,
            {...this.options, method: "DELETE"}
        );
    }
    
    async put(
        putDeleteVehicleDto: PutDeleteVehicleDto,
        createVehicleDto: CreateVehicleDto
    ): Promise<VehicleEntity> {
        const result = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles/${putDeleteVehicleDto.id}`,
            {
                method: "PUT",
                body: JSON.stringify(createVehicleDto),
                ...this.options
            }
        );
        return VehicleMapper.vehicleEntityFromObject(result);
    }

    async getAll(getAllVehiclesDto: GetAllVehiclesDto): Promise<PaginatedVehiclesEntity> {
        const { page, limit } = getAllVehiclesDto;
        const paginatedVehicles = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_LOCAL_API}vehicles?limit=${limit}&page=${page}`
        );
        return PaginatedVehiclesMapper.paginatedVehiclesEntityFromObject(paginatedVehicles);
    }

    async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {  
        const result = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_API}vehicles/create`,
            {
                method: "POST",
                body: JSON.stringify(createVehicleDto),
                ...this.options
            }
        );
        return VehicleMapper.vehicleEntityFromObject(result);
    }

}