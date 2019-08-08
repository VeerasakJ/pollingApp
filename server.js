const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// localhost port
const port = 4001

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

// socket.io
io.on('connection', socket => {
  
  console.log('New client connected')
  
  socket.on('vote', (id,jsLib) => {
    console.log('Vote for:', id,jsLib)
    io.sockets.emit('vote', id,jsLib)
  
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log("Listening on port ${port}"))