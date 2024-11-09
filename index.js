require('dotenv').config()
const express = require('express')
const connection= require("./DB_cannection")
const cors = require('cors')
const STUDENT_ROUTES=require("./Router/Student_Router")

const app = express()
const PORT = process.env.PORT || 8000
const Db_URI= process.env.MONGO_URL

connection(Db_URI)
.then(()=>console.log("DB CONNECTED ........"))
.catch((e)=> console.log("ERROR: ",e))
app.use(cors())
app.use(express.json())
app.use(cors())
app.get("/test",(req,res)=>{
    res.json({
        msg:"HEELO CODER DO NOT WORRY SERVER IS RUNNING FINE......"
    })
})
app.use("/api/student",STUDENT_ROUTES)
app.listen(PORT,()=>{
    console.log("SERVOR IS UP AT PORT NUMBER 8005");
})