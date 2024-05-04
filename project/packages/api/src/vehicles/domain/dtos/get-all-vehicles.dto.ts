import { Validators } from "../../../utils/validators.utils";


export class GetAllVehiclesDto {
    private constructor(
        public limit: number,
        public page: number,
        public query: string,
        public sort: string
    ) { }

    static create(object: { [key: string]: any }): [string?, GetAllVehiclesDto?] {
        let { limit, page, query, sort } = object;

        if(!limit || (typeof limit == "string" && limit.trim().length == 0))
            limit = 10; 
        if(!Validators.numeric.test(limit))
            return ["Limit must be numeric"];
        limit = parseInt(limit) || 1;

        if(!page || (typeof page == "string" && page.trim().length == 0))
            page = 1; 
        if(!Validators.numeric.test(page))
            return ["Page must be numeric"];
        page = parseInt(page) || 1;

        if(!query) query = '';

        if(!sort) sort = 'year';

        return [undefined, new GetAllVehiclesDto(limit, page, query, sort)];       
    }

    private static tryParseInt(value: string, defaultValue: number): number | [string] {
        if(!value || (typeof value == "string" && value.trim().length == 0))
            return defaultValue;
        
        if(!Validators.numeric.test(value))
            return ["Limit must be numeric"];
        return parseInt(value);
    }
}