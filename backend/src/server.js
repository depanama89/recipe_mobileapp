import express from "express"
import 'dotenv/config'
import { ENV } from "./config/env.js"
import { db } from "./config/db.js"

import favoriteRoute from "./route/favorite/favoriteRoute.js"

const app=express()

const PORT=ENV.PORT || 5001
const DATABASE=ENV.DATABASE_URL


app.use(express.json())


app.use("/api/favorites",favoriteRoute)
app.get("/api/healthy",(req,res)=>{
    res.status(200).json({success:true})
})

// app.listen(PORT,()=>{
//     console.log(`Serveur is runnig on PORT:${PORT}`)
// })

console.log("App démarrée !");

export default app