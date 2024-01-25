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

let videoFormat;
const jobs = {

};

app.post('/convert',upload.single('filename'),async(req,res) => {
    const jobId = Date.now().toString();

    const inputFilePath = req.file.path;
    videoFormat = req.body.videoFormat;
    const outputFilePath = `converted_${jobId}.${videoFormat}`

    //ffmpeg

    const {streams} = await ffprobe(inputFilePath,{
        path: "ffprobe"
    })

    const videoStream = streams.find((stream) => stream.codec_type === "video")

    const totalTimeDuration = videoStream ? parseFloat(videoStream.duration) : 0

    console.log(totalTimeDuration)

    //making progress Bar
    const bar = new Progress("[:bar] :percent :etas",{
        width: 40,
        total:totalTimeDuration
    })

    const job = ffmpeg()
                .input(inputFilePath)
                .videoCodec("")
})


io.on('connection',(socket)=>{
    // console.log(socket)
})

server.listen(3000,()=>{
    console.log('app is listening on 3000')
})