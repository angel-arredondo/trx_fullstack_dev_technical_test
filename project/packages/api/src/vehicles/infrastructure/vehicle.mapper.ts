import { CustomError } from "../../utils/custom-error.util";
import { VehicleEntity } from "../domain";

export class VehicleMapper {
    static vehicleEntityFromObject(object: { [key: string]: any }) {
        const {
            id,
            color,
            economicNumber,
            insurance,
            licensePlates,
            manufacturer,
            model,
            seats,
            vin,
            year
        } = object;

        if (!id) throw CustomError.internalServer("Missing id");
        if (!color) throw CustomError.badRequest("Missing color");
        if (typeof economicNumber != "string") throw CustomError.badRequest("Missing economic number");
        if (!insurance) throw CustomError.badRequest("Missing insurance");
        if (!licensePlates) throw CustomError.badRequest("Missing license plates");
        if (!manufacturer) throw CustomError.badRequest("Missing manufacturer");
        if (!model) throw CustomError.badRequest("Missing model");
        if (!seats) throw CustomError.badRequest("Missing seats");
        if (!vin) throw CustomError.badRequest("Missing VIN");
        if (!year) throw CustomError.badRequest("Missing year");


        return new VehicleEntity(
            id,
            color,
            economicNumber,
            insurance,
            licensePlates,
            manufacturer,
            model,
            seats,
            vin,
            year
        )
    }
}