import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const register = async (firstname, lastname, email, password) => {
    const userExists = await User.findOne({ email })
    if (userExists) return { token: null, user: null }

    const hashedPassword =  await User.hashPassword(password)
    
    const user = await User.create({
        firstname, lastname,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: '24h'
    })

    return { token, user }
}


export const login = async (email, password) => {
    const user = await User.findOne({ email }).select("+password")
    if (!user) return { token: null, user: null }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) return { token: null, user: null }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: '24h'
    })

    return { token, user }
}