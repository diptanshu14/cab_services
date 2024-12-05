import mongoose from "mongoose"
import bcrypt from "bcrypt"

const driverSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    status: {
        type: String,
        enum: [ "active", "inactive" ],
        default: "inactive"
    },
    vehicle: {
        type: String,
        required: true
    },
    numberPlate: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    vehicleType: {
        type: String,
        required: true,
        enum: [ "car", "motorcycle", "auto" ]
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
}, { timestamps: true })

driverSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

driverSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const Driver = mongoose.model("Driver", driverSchema)

export default Driver