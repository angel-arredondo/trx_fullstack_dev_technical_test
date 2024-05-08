

export class Validators {
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