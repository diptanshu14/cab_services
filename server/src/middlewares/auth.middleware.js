import User from "../models/user.model.js"
import Driver from "../models/driver.model.js"
import jwt from "jsonwebtoken"

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id)

        req.user = user

        return next()
    } catch (error) {
        console.log("Error in auth user middleware: ", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const authDriver = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const driver = await Driver.findById(decoded._id)

        req.driver = driver

        return next()
    } catch (error) {
        console.log("Error in auth driver middleware: ", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}