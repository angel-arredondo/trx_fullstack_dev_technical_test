import { Router } from "express";
import { GeoRouteRepository } from "../../../geo-routes/geo-route.repository";
import { GeoRouteController } from "./geo-route.controller";


export class GeoRouteRoutes {
    constructor(
        private readonly geoRouteRepository: GeoRouteRepository
    ){}

    getRoutes(): Router {
        const router = Router(); 
        const geoRouteController = new GeoRouteController(this.geoRouteRepository);

        router.get('/', geoRouteController.getAllGeoRoutes);

        return router;
    }
}