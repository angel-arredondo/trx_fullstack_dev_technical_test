import { GeoRouteEntity } from "../geo-route.entity";
import { GeoRouteRepository } from "../geo-route.repository";
import { GeoRouteUseCase } from "./geo-route.use-case";

export class GetAllGeoRoutesUseCase implements GeoRouteUseCase {
    constructor(
        private readonly geoRouteRepository: GeoRouteRepository
    ){}
    execute(): GeoRouteEntity[] {
        return this.geoRouteRepository.getAll();
    }

}