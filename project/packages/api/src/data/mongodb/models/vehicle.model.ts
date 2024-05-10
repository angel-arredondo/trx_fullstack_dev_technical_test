import { Schema, model } from "mongoose";

const insuranceSchema = new Schema({
    number:{
        type: String,
        default:""
    },
    carrier: {
        type: String,
        default: ""
    }
}, { _id : false })

const vehicleSchema = new Schema({
    color:{
        type: String,
        require: [true, 'Color is required']
    },
    economicNumber:{
        type: String,
        default:""
    },
    insurance:{
        type: insuranceSchema
    },
    licensePlates:{
         type: String,
         require: [true, 'License plate is required'],
         unique: true
    },
    manufacturer:{
        type: String,
        require: [true, 'Manufacturer is required']
    },
    model:{
        type: String,
        require: [true, 'Model is required']
    },
    position:{
        type:[Number],
        require: [true, 'Position is required']
    },
    seats:{
        type: Number,
        require: [true, 'Seats is required']
    },
    status:{
        type: String,
        require: [true, 'Status is required']
    },
    vin:{
        type: String,
        require: [true, 'VIN is required'],
        unique: true
    },
    year:{
        type: Number,
        require: [true, 'Year is required']
    }
})


export const VehicleModel = model('Vehicle',vehicleSchema);