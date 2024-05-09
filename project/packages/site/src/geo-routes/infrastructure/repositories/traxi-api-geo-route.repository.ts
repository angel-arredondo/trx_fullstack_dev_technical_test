import { HttpClientAdapter } from "../../../adapters/http-client.adapter";
import { GeoRouteEntity } from "../../domain/geo-route.entity";
import { GeoRouteRepository } from "../../domain/geo-route.repository";
import { GeoRouteMapper } from "../geo-route.mapper";

export class TraxiApiGeoRouteRepository implements GeoRouteRepository {
    async getAll() {
        const routes = await HttpClientAdapter.fetch(
            `${import.meta.env.VITE_LOCAL_API}georoutes`
        );
        if(!Array.isArray(routes)) throw Error("");

        const parsedRoutes: GeoRouteEntity[] = [];
        routes.map((route)=>{
            parsedRoutes.push(GeoRouteMapper.geoRouteEntityFromObject(route));
        });

        return parsedRoutes;
    }

}