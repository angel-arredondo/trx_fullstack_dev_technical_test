import { VehicleEntity } from "../vehicles/domain";


export class Validators {
    static getErrorMessage(key: keyof VehicleEntity, value: number | string): string | undefined {
        const validationByKey = {
            "licensePlates": () => {
                if (!value) return "Placas son requeridas";
                if (typeof value === "string" && !/^[A-Z0-9]{4,7}$/g.test(value))
                    return "Las placas deben tener entre 4 y 7 caracteres con letras y números";
            },
            "color": () => {
                if (!value) return "Color es requerido";
                if (typeof value !== "string" || !/^[A-zÀ-ú]+$/g.test(value))
                    return "El formato de color no es válido";
                if (value.length < 3) return "Color debe tener al menos 3 caracteres"
            },
            "economicNumber": () => {
                if (!value) return;
                if (typeof value !== "string" || !/^[A-zÀ-ú]+$/g.test(value))
                    return "El formato de número económico no es válido";
            },
            "vin": () => {
                if (!value) return "VIN es requerido";
                if (typeof value !== "string" || !/^[A-HJ-NPR-Z0-9]{17}$/g.test(value))
                    return "La serie VIN debe tener 17 caracteres con letras y números";
            },
            "model": () => {
                if (!value) return "Modelo es requerido";
                if (typeof value !== "string" || value.length == 0)
                    return "El formato de modelo no es válido";
            },
            "year": () => {
                const maxYear = new Date().getFullYear() + 1;
                if (!value) return "Año es requerido";
                if (typeof value !== "number") return "Año debe ser numérico";
                if (value < 1900 || value > maxYear)
                    return `El año no debe ser menor a 1900 ni mayor a ${maxYear}`;
            },
            "manufacturer": () => {
                if (!value) return "Marca es requerido";
                if (typeof value !== "string")
                    return "El formato de marca no es válido";
                if (value.length < 2)
                    return "Marca debe tener al menos dos caracteres"
            },
            "seats": () => {
                if (!value) return "Número de asientos es requerido";
                if (typeof value !== "number")
                    return "El formato de número de asientos no es válido";
                if (value < 1)
                    return "El número mínimo de asientos es 1"
            }
        }
        return validationByKey[key]();
    }
    static get vin(){
        return /^[A-HJ-NPR-Z0-9]{17}$/g
    }
    static get alpha(){
        return /^[A-zÀ-ú]+$/g
    }
    static get licensePlates(){
        return /^[A-Z0-9]{4,7}$/g
    }
    static get numeric(){
        return /^\d+$/g
    }
    static get mongoId(){
        return /^[a-f\d]{24}$/i
    }
}