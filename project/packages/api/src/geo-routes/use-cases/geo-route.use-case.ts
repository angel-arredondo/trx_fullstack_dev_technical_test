import { GeoRouteEntity } from "../geo-route.entity";

export abstract class GeoRouteUseCase {
    /**
     * Executes a geo `route` use case
     * @returns A `GeoRouteEntity` array
     */
    abstract execute(): GeoRouteEntity[];
}