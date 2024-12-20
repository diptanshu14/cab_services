import express from "express"
import { body } from "express-validator"
import * as userCtrl from "../controllers/user.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be 8 characters long")
], userCtrl.register)

router.post("/login", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 8 }).withMessage("Password must be 8 characters long")
], userCtrl.login)

router.get("/profile", authUser, userCtrl.getUserProfile)

router.get("/logout", authUser, userCtrl.logoutUser)

export default router