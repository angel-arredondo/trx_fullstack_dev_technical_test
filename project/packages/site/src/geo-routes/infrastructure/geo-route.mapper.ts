import { CustomError } from "../../utils/custom-errors.util";
import { GeoRouteEntity } from "../domain/geo-route.entity";

export class GeoRouteMapper {
    static geoRouteEntityFromObject(object: { [key: string]: any }) {
        const { id, color, coordinates } = object;
        const error = "GeoRouteMapper ->";
        if(typeof id !== "number") throw CustomError.mapper(`${error} missing id`);
        if(typeof color !== "string") throw CustomError.mapper(`${error} missing color`);
        if(coordinates === undefined) throw CustomError.mapper(`${error} missing coordinates`);
        if(!Array.isArray(coordinates)) throw CustomError.mapper(`${error} missing coordinates`);
        coordinates.map((coorsList)=>{
            if(!Array.isArray(coorsList)) throw CustomError.mapper(`${error} invalid coordinate`);
            coorsList.map((coors)=>{
                if(typeof coors !== "number") throw CustomError.mapper(`${error} invalid coordinate`);
            })
        });
        return new GeoRouteEntity(id, color, coordinates);
    }
}