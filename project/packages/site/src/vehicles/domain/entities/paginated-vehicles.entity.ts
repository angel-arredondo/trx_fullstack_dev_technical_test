import { VehicleEntity } from "./vehicle.entity";

export class PaginatedVehiclesEntity {
    constructor(
        public totalVehicles: number,
        public limit: number,
        public totalPages: number,
        public page: number,
        public hasPrevPage: Boolean,
        public hasNextPage: Boolean,
        public prevPage: number,
        public nextPage: number,
        public vehicles: VehicleEntity[],
    ) { }
}