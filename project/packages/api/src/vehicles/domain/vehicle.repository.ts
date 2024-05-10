import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { VehicleEntity } from "./entities/vehicle.entity";
import { GetAllVehiclesDto } from "./dtos/get-all-vehicles.dto";
import { PutDeleteVehicleDto } from "./dtos/put-delete-vehicle.dto";

export interface PaginatedVehicles {
    totalVehicles: number;
    limit: number;
    totalPages: number;
    page: number | undefined;
    hasPrevPage: Boolean;
    hasNextPage: Boolean;
    prevPage: number | undefined;
    nextPage: number | undefined;
    query: string;
    vehicles: VehicleEntity[];
}

export abstract class VehicleRepository {
    /**
     * Creates a new `Vehicle` resource in database
     * @param createVehicleDto vehicle properties
     * @returns A promise that will be resolved with a `VehicleEntity`
     */
    abstract create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity>;

    /**
     * Gets paginated `Vehicle` resources from database
     * @param getAllVehiclesDto pagination properties
     * @returns A promise that will be resolved with a `PaginationVehicle` interface
     */
    abstract getAll(
        getAllVehiclesDto: GetAllVehiclesDto
    ): Promise<PaginatedVehicles>;

    /**
     * Updates a `vehicle` or create it is does not exists
     * @param putDeleteVehicleDto vehicle id
     * @param createVehicleDto vehicle properties
     * @returns A promise that will be resolved with a `VehicleEntity`
     */
    abstract put(
        putDeleteVehicleDto: PutDeleteVehicleDto, 
        createVehicleDto: CreateVehicleDto
    ): Promise<VehicleEntity>;

    /**
     * Deletes a `vehicle` by the received id
     * @param deleteVehicleDto vehicle id
     */
    abstract delete(deleteVehicleDto: PutDeleteVehicleDto):Promise<void>;
}