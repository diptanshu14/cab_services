import express from "express"
import { body } from "express-validator"
import * as driverCtrl from "../controllers/driver.controller.js"

const router = express.Router()

router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
    body('capacity').isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
    body('vehicleType').isIn([ "car", "motorcycle", "auto" ]).withMessage("Invalid Vehicle Type")
], driverCtrl.register)

export default router