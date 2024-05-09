import { GeoRouteEntity } from "../domain/geo-route.entity";
import { GeoRouteRepository } from "../domain/geo-route.repository";
import { GeoRouteUseCase } from "./geo-route.use-case";

export class GetAllGeoRoutesUseCase implements GeoRouteUseCase {
    constructor(
        private readonly geoRouteRepository: GeoRouteRepository
    ){}
    async execute(): Promise<GeoRouteEntity[]> {
        return await this.geoRouteRepository.getAll();
    }

}