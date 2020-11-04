const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { DEFAULT_PORT}  = require('./config')
const PORT = process.env.PORT ||  DEFAULT_PORT
const Router = require('./router.js')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// socket connection and disconection
io.on('connection', (socket)=>{
    console.log('connection established successfully');

    socket.on('disconnect', ()=>{
        console.log("the user has left the connection!!!!!!!")
    })
})

app.use('/demo', Router) 

server.listen(PORT, ()=>{
    console.log(`server up and running on port ${PORT}`)
})