export interface Insurance {
    number: string;
    carrier: string;
}

export class VehicleEntity {
    constructor(
        public id: string,
        public color: string,
        public economicNumber: string,
        public insurance: Insurance,
        public licensePlates: string,
        public manufacturer: string,
        public model: string,
        public seats: number,
        public vin: string,
        public year: number,
    ){}
}

