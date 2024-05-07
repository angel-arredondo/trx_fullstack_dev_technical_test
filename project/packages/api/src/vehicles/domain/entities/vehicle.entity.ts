export interface Insurance {
    number: string;
    carrier: string;
}
export type status = "detenido" | "apagado" | "avanzando" | "encendido";
export class VehicleEntity {
    constructor(
        public id: string,
        public color: string,
        public economicNumber: string,
        public insurance: Insurance,
        public licensePlates: string,
        public manufacturer: string,
        public model: string,
        public position: number[],
        public seats: number,
        public status: status,
        public vin: string,
        public year: number,
    ){}
}

