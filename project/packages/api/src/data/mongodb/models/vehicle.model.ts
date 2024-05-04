import mongoose, {Schema} from "mongoose";

const insuranceSchema = new Schema({
    number:{
        type: String,
        require: [true, 'Insurance number is required']
    },
    carrier: {
        type: String,
        require: [true, 'Insurance carrier is required']
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
        type: insuranceSchema,
        require: [true, 'Insurance is required']
        
    },
    licensePlates:{
         type: String,
         require: [true, 'License plate is required']
    },
    manufacturer:{
        type: String,
        require: [true, 'Manufacturer is required']
    },
    model:{
        type: String,
        require: [true, 'Model is required']
    },
    seats:{
        type: Number,
        require: [true, 'Seats is required']
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

export const VehicleModel = mongoose.model('Vehicle',vehicleSchema);