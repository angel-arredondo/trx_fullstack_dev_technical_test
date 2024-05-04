import { PaginationModel } from "mongoose-paginate-ts";
import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { VehicleEntity } from "./entities/vehicle.entity";
import { GetAllVehiclesDto } from "./dtos/get-all-vehicles.dto";
// import { Vehicle } from "../../data/mongodb/models/vehicle.model";

export interface PaginationVehicle {
    totalVehicles: number | undefined;
    limit: number | undefined;
    totalPages: number | undefined;
    page: number | undefined;
    hasPrevPage: Boolean | undefined;
    hasNextPage: Boolean | undefined;
    prevPage: number | undefined;
    nextPage: number | undefined;
    vehicles: VehicleEntity[];
}

export abstract class VehicleRepository {
    abstract create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity>;
    abstract getAll(
        getAllVehiclesDto: GetAllVehiclesDto
    ): Promise<PaginationVehicle>;
}