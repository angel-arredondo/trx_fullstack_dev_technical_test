import { routes } from "../../../data/mocks/routes.mock";
import { Validators } from "../../../utils/validators.utils";
import type { status as vehicleStatus } from "../entities/vehicle.entity";

export class CreateVehicleDto {
    private constructor(
        public color: string,
        public economicNumber: string,
        public insurance:{
            number: string;
            carrier: string;
        },
        public licensePlates: string,
        public manufacturer: string,
        public model: string,
        public position: number[],
        public seats: number,
        public status: vehicleStatus,
        public vin: string,
        public year: number,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateVehicleDto?] {
        let { 
            color,
            economicNumber,
            insuranceCarrier, 
            insuranceNumber,
            licensePlates,
            manufacturer,
            model,
            seats,
            vin,
            year
        } = object;
        
        if(!color) return ["Missing color"];
        if(typeof color != "string") return ["Color must be string"];
        if(color.length < 3) return ["Color is too short"];
        color = color.trim();
        if(!Validators.alpha.test(color)) return ["Color is no valid"];

        if(economicNumber){
            if(typeof economicNumber != "string")
                return ["Economic number must be string"];
            economicNumber = economicNumber.trim();
        }

        if(insuranceCarrier){
            if(typeof insuranceCarrier != "string") 
                return ["Insurance carrier must be string"];
            insuranceCarrier = insuranceCarrier.trim();
            if(insuranceCarrier.length < 2) return ["Insurance carrier is too short"];
        }

        if(insuranceNumber){
            if(typeof insuranceNumber != "string") 
                return ["Insurance number must be string"];
            insuranceNumber = insuranceNumber.trim();
            if(insuranceNumber.length < 2) return ["Insurance number is too short"];
        }

        if(!licensePlates) return ["Missing license plates"];
        if(typeof licensePlates != "string") return ["License plates must be string"];
        licensePlates = licensePlates.trim().toUpperCase();
        if(!Validators.licensePlates.test(licensePlates))
            return ["License plate is not valid "];

        if(!manufacturer) return ["Missing manufacturer"];
        if(typeof manufacturer != "string") 
            return ["Manufacturer must be string"];
        manufacturer = manufacturer.trim();
        if(manufacturer.trim().length < 2) return ["Manufacturer is too short"];

        if(!model) return ["Missing model"];
        if(typeof model != "string") 
            return ["Model must be string"];
        model = model.trim();
        if(model.length < 1) return ["Model is too short"];

        const position = routes[Math.floor(Math.random()*5)].coordinates[Math.floor(Math.random()*15)];

        if(!seats) return ["Missing seats"];
        if(typeof seats != "number") return ["Seats must be number"];
        if(seats < 1) return ["Seats must be greater than zero"];

        const status = [
            "avanzando",
            "detenido",
            "apagado",
            "encendido"
        ][Math.floor(Math.random()*4)];

        if(!vin) return ["Missing VIN"];
        if(typeof vin != "string") return ["VIN must be string"];
        vin = vin.trim().toUpperCase();
        if(!Validators.vin.test(vin.trim())) return ["VIN is invalid"];

        const maxYear = new Date().getFullYear() + 1;
        if(!year) return ["Missing year"];
        if(typeof year != "number") return ["Year must be a number"];
        if(year < 1900) return ["Year must be greater than 1900"];
        if(year > maxYear) return [`Year must be less than ${maxYear + 1}`];

        const insurance = {
            number: insuranceNumber,
            carrier: insuranceCarrier
        }

        return [undefined, new CreateVehicleDto(
            color,
            economicNumber,
            insurance,
            licensePlates,
            manufacturer,
            model,
            position,
            seats,
            status as vehicleStatus,
            vin,
            year
        )]
    }
}