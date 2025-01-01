import express from "express"
import connectDB from "./db/db.js"
import dotenv from 'dotenv'
import bodyparser from "body-parser"
import userRouter from "./routes/user.js"
const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT || 3000
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/v1/user",userRouter)

app.listen(PORT,()=>{
    console.log(`Server listen at port ${process.env.PORT}`)
})