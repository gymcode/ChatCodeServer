const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUserbyId, getUser, getUsersInRoom}  = require('./users')

const { DEFAULT_PORT}  = require('./config')
const PORT = process.env.PORT ||  DEFAULT_PORT
const Router = require('./router.js')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// socket connection and disconection
io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('join', ({name, room}, callback)=>{
        const {error, user}  = addUser({id, name, room})

        if (error) return {error}

        socket.emit('message', {user: "admin", text: `${name}!!! welcome senior most boss to room ${room}`})

        socket.join(user.room)
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})


app.use('/demo', Router) 

server.listen(PORT, ()=>{
    console.log(`server up and running on port ${PORT}`)
})