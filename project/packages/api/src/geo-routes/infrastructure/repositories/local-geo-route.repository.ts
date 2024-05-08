import { GeoRouteRepository } from "../../geo-route.repository";
import { routes } from "../../../data/mocks/routes.mock";

export class LocalGeoRouteRepository implements GeoRouteRepository{
    getAll() {
        return routes;
    }

}