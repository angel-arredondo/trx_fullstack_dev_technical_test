import { GeoRouteEntity } from "./geo-route.entity";

export abstract class GeoRouteRepository {
    /**
     * Gets all dummies geo `routes`
     * @returns A `GeoRouteEntity`
     */
    abstract getAll(): GeoRouteEntity[];
}