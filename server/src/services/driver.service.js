import Driver from "../models/driver.model.js"
import jwt from "jsonwebtoken"

export const register = async (
    firstname, lastname, email, password, vehicle, numberPlate, capacity, vehicleType
) => {
    const driverExists = await Driver.findOne({ email })
    if (driverExists) return { token: null, user: null }

    const hashedPassword =  await Driver.hashPassword(password)
    
    const driver = await Driver.create({
        firstname, lastname, email, password: hashedPassword,
        vehicle, numberPlate, capacity, vehicleType
    })

    const token = jwt.sign({ _id: driver._id }, process.env.JWT_SECRET, { 
        expiresIn: '24h'
    })

    return { token, driver }
}


export const login = async (email, password) => {
    const driver = await Driver.findOne({ email }).select("+password")
    if (!driver) return { token: null, driver: null }

    const isPasswordValid = await driver.comparePassword(password)
    if (!isPasswordValid) return { token: null, driver: null }

    const token = jwt.sign({ _id: driver._id }, process.env.JWT_SECRET, { 
        expiresIn: '24h'
    })

    return { token, driver }
}