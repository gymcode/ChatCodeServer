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
    socket.on('join', ({name, room}, callback)=>{
        const {error, user}  = addUser({id: socket.id, name, room})
        console.log(name, room)

        if (error) return {error}

        // this is imforming the user that he is welcome to the chat 
        socket.emit('message', {user: "admin", text: `${user.name}!!! welcome senior most boss to room ${user.room}`})

        // making a broadcast to everyone else about a user's entry 
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has just joined the partyyyyy`})

        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        // console.log(user)
        io.to(user.room).emit('message', {user: user.name, text: message})

        callback()
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})


app.use('/demo', Router) 

server.listen(PORT, ()=>{
    console.log(`server up and running on port ${PORT}`)
})