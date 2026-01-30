import dotenv from "dotenv"
dotenv.config() //This loads .env file into process.env.

import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import subscriberRoute from "./routes/subscriberRoute.js"
import adminRoutes from "./routes/adminRoutes.js"
import productAdminRoute from "./routes/productAdminRoutes.js"
import adminOrderRoute from "./routes/adminOrderRoute.js"

const app=express() //instance of backend application, it handles routes, middlewares, 
app.use(express.json()) //tells express to parse json data in request body
// if frontend says:{"email":"test@xample.com"} then u can access it as req.body.email
app.use(cors())
connectDB()

const PORT=process.env.PORT||3000 

app.get("/",(req, res)=>{ 
    res.send("WELCOME TO FitAura API")
})
//API routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/subscribe", subscriberRoute)

//Admin Routes
app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productAdminRoute)
app.use("/api/admin/orders", adminOrderRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})