

export class Validators {
    static get vin(){
        return /^[A-HJ-NPR-Z0-9]{17}$/g
    }
    static get alpha(){
        return /^[a-zA-Z]+$/g
    }
    static get licensePlates(){
        return /^[A-Z0-9]{4,7}$/g
    }
}