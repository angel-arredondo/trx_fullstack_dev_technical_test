import { GeoRouteEntity } from "../domain/geo-route.entity";

export abstract class GeoRouteUseCase {
    /**
     * Executes a geo `route` use case
     * @returns A `GeoRouteEntity` array
     */
    abstract execute(): Promise<GeoRouteEntity[]>;
}