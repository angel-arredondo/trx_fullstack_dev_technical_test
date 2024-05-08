import { HttpClientAdapter } from "../adapters/http-client.adapter";

export interface GeoRoute {
    id: number,
    color: string,
    coordinates: number[][]
}

export class GetGeoRouteUtil {
     static async getRoutes () {
        const routes:GeoRoute[] = await HttpClientAdapter.fetch("http://localhost:3001/api/v1/georoutes");
        return routes;
    }
}