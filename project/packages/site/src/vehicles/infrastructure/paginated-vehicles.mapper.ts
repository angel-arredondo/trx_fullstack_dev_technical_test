
import { CustomError } from "../../utils/custom-errors.util";
import { PaginatedVehiclesEntity, VehicleEntity } from "../domain";
import { VehicleMapper } from "./vehicle.mapper";

export class PaginatedVehiclesMapper {
    static paginatedVehiclesEntityFromObject(object: { [key: string]: any }) {
        const {
            totalVehicles,
            limit,
            totalPages,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            query,
            vehicles
        } = object;
        const error = "PaginatedVehiclesMapper ->"
        if (typeof totalVehicles !== "number") throw CustomError.mapper(`${error} Missing id`);
        if (typeof limit !== "number") throw CustomError.mapper(`${error} Missing color`);
        if (typeof totalPages !== "number") throw CustomError.mapper(`${error} Missing id`);
        if (typeof page !== "number") throw CustomError.mapper(`${error} Missing insurance`);
        if (typeof hasPrevPage !== "boolean") throw CustomError.mapper(`${error} Missing license plates`);
        if (typeof hasNextPage !== "boolean") throw CustomError.mapper(`${error} Missing manufacturer`);
        if (page > 1 && typeof prevPage !== "number") throw CustomError.mapper(`${error} Missing model`);
        if (page < totalPages && typeof nextPage !== "number") throw CustomError.mapper(`${error} Missing position`);
        if (vehicles === undefined) throw CustomError.mapper(`${error} Missing position`);
        if(!Array.isArray(vehicles)) throw CustomError.mapper(`${error} Missing position`);
        const parsedVehicles: VehicleEntity[] = [];
        vehicles.map((vehicle)=> {
            const parsedVehicle = VehicleMapper.vehicleEntityFromObject(vehicle);
            parsedVehicles.push(parsedVehicle);
        });

        return new PaginatedVehiclesEntity(
           totalVehicles,
           limit,
           totalPages,
           page,
           hasPrevPage,
           hasNextPage,
           prevPage,
           nextPage,
           query,
           parsedVehicles,
        )
    }
}