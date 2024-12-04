import { validationResult } from "express-validator"
import * as userService from "../services/user.service.js"

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { firstname, lastname, email, password } = req.body

    const result = await userService.register(firstname, lastname, email, password)
    const { token, user } = result

    if (!user) {
        return res.status(400).json({ message: 'User already exists' })
    }

    return res.status(201).json({ token, user })
}

export const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {  email, password } = req.body

    const result = await userService.login(email, password)
    const { token, user } = result

    if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' })
    }

    res.cookie('token', token)
    res.status(200).json({ token, user })
}