export interface Insurance {
    number: string;
    carrier: string;
}

export class VehicleEntity {
    constructor(
        public color: string,
        public economicNumber: string,
        public id: string,
        public insurance: Insurance,
        public licensePlates: string,
        public manufacturer: string,
        public model: string,
        public position:number[],
        public seats: number,
        public status: string,
        public vin: string,
        public year: number,
        public isNew?: boolean
    ){}
}
