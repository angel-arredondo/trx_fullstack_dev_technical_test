import { GeoRouteEntity } from "./geo-route.entity";

export abstract class GeoRouteRepository {
    /**
     * Gets all dummy geo `routes`
     * @returns A `GeoRouteEntity` array
     */
    abstract getAll(): Promise<GeoRouteEntity[]>;
}