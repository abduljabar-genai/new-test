

import express from 'express'
import cors from 'cors'

import fs from 'fs'

import path from 'path'

import multer from 'multer'

const app=express()
const uploadDir='uploads'

if(!fs.existsSync(uploadDir))
{
fs.mkdirSync(uploadDir,{recursive:true})

}

app.use(cors())

const storage=multer.diskStorage(
    {
    destination:(req,file,cb)=>{
     cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
     
        const uniqueSuffix=Date.now()+"_"+ Math.round(Math.random()*1E9)
        const fileName=uniqueSuffix+path.extname(file.originalname)
        cb(null,fileName)

    }
}
)

const upload=multer({storage:storage})

app.get('/',(req,res)=>{
    debugger
    console.log("started")
    debugger
    res.status(201).json(
    {
        success:true,
        message: "working",
        data:{msg:"Hello World"}
    }
    )
})

app.get('/generate',(req,res)=>{
   
    res.end("Hello World")
})

app.post('/upload',upload.single('myFile'),(req,res)=>{
    if(!req.file)
    {
        res.status(400).send("No file provided")
    }

    res.send(`File uploaded successfully. ${req.file.filename}`)
})

export default app;