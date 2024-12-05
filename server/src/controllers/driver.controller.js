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
        console.log("Error in register driver controller: ", error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {  email, password } = req.body

    try {
        const result = await driverService.login(email, password)
        const { token, driver } = result

        if (!driver) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        res.cookie('token', token)
        res.status(200).json({ token, driver })
    } catch (error) {
        console.log("Error in login driver controller: ", error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const getDriverProfile = async (req, res) => {
    return res.status(200).json(req.driver)
}


export const logoutDriver = async (req, res) => {
    res.clearCookie('token')

    return res.status(200).json({ message: "Driver logged out" })
}