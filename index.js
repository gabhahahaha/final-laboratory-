// Optional Express API starter. Configure a real MySQL connection before using this as production backend.
import express from 'express'
import cors from 'cors'
const app=express()
app.use(cors())
app.use(express.json())
app.get('/api/health',(req,res)=>res.json({status:'ok',message:'Food Ordering API is running'}))
app.listen(process.env.PORT||4000,()=>console.log(`API running on port ${process.env.PORT||4000}`))
