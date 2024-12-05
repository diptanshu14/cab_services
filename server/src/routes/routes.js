import express from "express"
import userRoutes from "./user.routes.js"
import driverRoutes from "./driver.routes.js"

const router = express.Router()

router.use("/api/users", userRoutes)
router.use("/api/drivers", driverRoutes)

export default router