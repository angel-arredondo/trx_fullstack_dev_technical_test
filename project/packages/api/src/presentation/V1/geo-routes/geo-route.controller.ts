import { Request, Response } from "express";
import { GeoRouteRepository } from "../../../geo-routes/geo-route.repository";
import { GetAllGeoRoutesUseCase } from "../../../geo-routes/use-cases/get-all-geo-routes.use.case";

export class GeoRouteController {
    constructor(
        private readonly geoRouteRepository: GeoRouteRepository
    ){}

    getAllGeoRoutes = (_req: Request, res: Response) => {
        const geoRoutes =  new GetAllGeoRoutesUseCase(this.geoRouteRepository)
        .execute();
        return res.status(200).json(geoRoutes);
    }
}