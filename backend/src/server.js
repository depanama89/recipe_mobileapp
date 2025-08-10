import express from "express"
import 'dotenv/config'
import { ENV } from "./config/env.js"
import { db } from "./config/db.js"

import favoriteRoute from "./route/favorite/favoriteRoute.js"
import job from "./config/cron.js"

const app=express()

const PORT=ENV.PORT 
const DATABASE=ENV.DATABASE_URL

// appel de job on aura besoin de ça que en production
// if(ENV.NODE_ENV==="production") job.start()

app.use(express.json())


app.use("/api/favorites",favoriteRoute)
app.get("/api/healthy",(req,res)=>{
    res.status(200).json({success:true})
})

app.listen(PORT,()=>{
    console.log(`Serveur is runnig on PORT:${PORT}`)
})

