import { useEffect, useState } from "react"
import { TraxiApiGeoRouteRepository } from "../../../geo-routes/infrastructure/repositories/traxi-api-geo-route.repository";
import { GetAllGeoRoutesUseCase } from "../../../geo-routes/use-cases/get-all-geo-routes.use.case";
import { GeoRouteEntity } from "../../../geo-routes/domain/geo-route.entity";

export const useGeoRoutes = () => {
    const [geoRoutes, setGeoRoutes] = useState<GeoRouteEntity[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error>();

    const loadGeoRoutes = async () => {
        try{
            const traxiApiGeoRouteRepository = new TraxiApiGeoRouteRepository();

            const geoRoutes = await new GetAllGeoRoutesUseCase(
                traxiApiGeoRouteRepository
            ).execute();

            setGeoRoutes(geoRoutes);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        loadGeoRoutes();
    },[]);

    return {
        error,
        geoRoutes,
        isLoading
    }
}