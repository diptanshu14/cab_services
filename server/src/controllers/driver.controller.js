import { validationResult } from "express-validator"
import * as driverService from "../services/driver.service.js"

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {  firstname, lastname, email, password, vehicle, numberPlate, capacity, vehicleType } = req.body

    try {
        const result = await driverService.register(firstname, lastname, email, password, vehicle, numberPlate, capacity, vehicleType)
        const { token, driver } = result

        if (!driver) {
            return res.status(400).json({ message: 'User already exists' })
        }

        return res.status(201).json({ token, driver })
    } catch (error) {
        console.log("Error in register user controller: ", error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}