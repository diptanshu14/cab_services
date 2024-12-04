import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI).then(() => {
        console.log(`Server is connected to database`)
    }).catch((err) => {
        console.log("Error connecting database to server: ", err)
    })
}

export default connectDB