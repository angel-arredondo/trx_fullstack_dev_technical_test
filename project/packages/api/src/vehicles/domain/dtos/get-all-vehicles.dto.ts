import { Validators } from "../../../utils/validators.utils";

interface Filter {
    filter: string;
    value: string;
    operator: string;
}

export class GetAllVehiclesDto {
    private constructor(
        public limit: number,
        public page: number,
        public query: string,
        public filter?: Filter
    ) { }

    static create(object: { [key: string]: any }): [string?, GetAllVehiclesDto?] {
        let { limit, page, query, filter, operator, value } = object;

        if (!limit || (typeof limit == "string" && limit.trim().length == 0))
            limit = 10;
        else {
            if (!Validators.numeric.test(limit))
                return ["Limit must be numeric"];
            else
                limit = parseInt(limit) || 1;
        }

        if (!page || (typeof page == "string" && page.trim().length == 0))
            page = 1;
        else {
            if (!Validators.numeric.test(page))
                return ["Page must be numeric"];
            else
                page = parseInt(page) || 1;
        }

        if (query) {
            if (typeof query !== "string")
                return ["Query must be string"];
        }

        if (filter) {
            if (typeof filter !== "string")
                return ["Filter must be string"];
        }

        if (operator) {
            if (typeof operator !== "string")
                return ["Operator must be string"];
        }

        if (value) {
            if (typeof value !== "string")
                return ["Operator must be string"];
            if((operator == "<" || operator == ">") && !Validators.numeric.test(value))
                return ["Filter value must be numeric"];
        }

        if (!query) query = '';

        if (!filter) filter = '';

        if (!operator) operator = '';

        if (!value) value = '';

        let newFilter;

        if (filter)
            newFilter =
            {
                filter,
                operator,
                value
            }

        return [undefined, new GetAllVehiclesDto(limit, page, query, newFilter)];
    }
}