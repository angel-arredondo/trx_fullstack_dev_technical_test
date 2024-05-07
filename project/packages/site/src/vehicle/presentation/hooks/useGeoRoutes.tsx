import { useEffect, useState } from "react"
import { GeoRoute, GetGeoRouteUtil } from "../../../utils/get-geo-routes.util";

export const useGeoRoutes = () => {
    const [geoRoutes, setGeoRoutes] = useState<GeoRoute[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error>();

    const loadGeoRoutes = async () => {
        try{
            const geoRoutes = await GetGeoRouteUtil.getRoutes();
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