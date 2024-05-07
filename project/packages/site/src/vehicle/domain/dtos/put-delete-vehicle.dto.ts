import { Validators } from "../../../utils/validators.util";


export class PutDeleteVehicleDto {
    private constructor(public id:string){}

    static create(object: { [key: string]: any }): [string?, PutDeleteVehicleDto?] {
        const { id } = object;

        if(!id) return ["Missing id"];
        if(typeof id !== "string") return ["Id is invalid"];
        if(!Validators.mongoId.test(id)) return ["Id is invalid"];

        return [undefined, new PutDeleteVehicleDto(id)];
    }
}