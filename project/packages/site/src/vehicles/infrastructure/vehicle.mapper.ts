
import { CustomError } from "../../utils/custom-errors.util";
import { VehicleEntity } from "../domain";

export class VehicleMapper {
    static vehicleEntityFromObject(object: { [key: string]: any }) {
        const {
            color,
            economicNumber,
            id,
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
        const error = "VehicleMapper ->"
        if (!id) throw CustomError.mapper(`${error} Missing id`);
        if (!color) throw CustomError.mapper(`${error} Missing color`);
        if (typeof economicNumber != "string") throw CustomError.mapper(`${error} Missing economic number`);
        if (!insurance) throw CustomError.mapper(`${error} Missing insurance`);
        if (!licensePlates) throw CustomError.mapper(`${error} Missing license plates`);
        if (!manufacturer) throw CustomError.mapper(`${error} Missing manufacturer`);
        if (!model) throw CustomError.mapper(`${error} Missing model`);
        if (!position) throw CustomError.mapper(`${error} Missing position`);
        if (!seats) throw CustomError.mapper(`${error} Missing seats`);
        if (!status) throw CustomError.mapper(`${error} Missing status`);
        if (!vin) throw CustomError.mapper(`${error} Missing VIN`);
        if (!year) throw CustomError.mapper(`${error} Missing year`);

        return new VehicleEntity(
            color,
            economicNumber,
            id,
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