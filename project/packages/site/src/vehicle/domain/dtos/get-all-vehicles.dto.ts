import { Validators } from "../../../utils/validators.util";

export class GetAllVehiclesDto {
    private constructor(
        public limit: number,
        public page: number,
        // public query: string,
        // public sort: string
    ) { }

    static create(object: { [key: string]: any }): [string?, GetAllVehiclesDto?] {
        let { page, pageSize } = object;
     
        let limit = pageSize;
        if(!limit || (typeof limit == "string" && limit.trim().length == 0))
            limit = 10;
        else {
            if(!Validators.numeric.test(limit))
                return ["Limit must be numeric"];
            else
                limit = parseInt(limit);
        }
            
        page++;
       
            
        // if(!query) query = '';

        // if(!sort) sort = 'year';

        return [undefined, new GetAllVehiclesDto(limit, page)];       
    }
}