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
        else {
            if(!Validators.numeric.test(limit))
                return ["Limit must be numeric"];
            else
                limit = parseInt(limit) || 1;
        }
            
        if(!page || (typeof page == "string" && page.trim().length == 0))
            page = 1; 
        else {
            if(!Validators.numeric.test(page))
                return ["Page must be numeric"];
            else
                page = parseInt(page) || 1;
        }
            
        if(!query) query = '';

        if(!sort) sort = 'year';

        return [undefined, new GetAllVehiclesDto(limit, page, query, sort)];       
    }
}