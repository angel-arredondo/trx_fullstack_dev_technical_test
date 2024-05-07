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
            position,
            seats,
            status,
            vin,
            year
        } = object;

        if (!id) throw CustomError.badRequest("Missing id");
        if (!color) throw CustomError.badRequest("Missing color");
        if (typeof economicNumber != "string") throw CustomError.badRequest("Missing economic number");
        if (!insurance) throw CustomError.badRequest("Missing insurance");
        if (!licensePlates) throw CustomError.badRequest("Missing license plates");
        if (!manufacturer) throw CustomError.badRequest("Missing manufacturer");
        if (!model) throw CustomError.badRequest("Missing model");
        if (!position) throw CustomError.badRequest("Missing position");
        if (!seats) throw CustomError.badRequest("Missing seats");
        if (!status) throw CustomError.badRequest("Missing status");
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
            position,
            seats,
            status,
            vin,
            year
        )
    }
}