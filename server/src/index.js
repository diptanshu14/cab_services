import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/database.js"

dotenv.config()
const app = express()

app.get("/test", (req, res) => {
    res.send("Test route is working")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
    connectDB()
})