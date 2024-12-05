import { validationResult } from "express-validator"
import * as userService from "../services/user.service.js"

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { firstname, lastname, email, password } = req.body

    try {
        const result = await userService.register(firstname, lastname, email, password)
        const { token, user } = result

        if (!user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        return res.status(201).json({ token, user })
    } catch (error) {
        console.log("Error in register user controller: ", error)
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
        const result = await userService.login(email, password)
        const { token, user } = result

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        res.cookie('token', token)
        res.status(200).json({ token, user })
    } catch (error) {
        console.log("Error in login user controller: ", error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


export const getUserProfile = async (req, res) => {
    return res.status(200).json(req.user)
}


export const logoutUser = async (req, res) => {
    res.clearCookie('token')

    return res.status(200).json({ message: "User logged out" })
}