const express = require('express')
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const ffprobe = require('ffprobe')
const Progress = require('progress')
const http = require('http')
const socketIo = require('socket.io')
const fs = require('fs')

const app = express()

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null,"uploads")
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: storage
})

app.use(express.static('public'))

const server = http.createServer(app)

const io = socketIo(server)

io.on('connection',(socket)=>{
    console.log(socket)
})

server.listen(3000,()=>{
    console.log('app is listening on 3000')
})