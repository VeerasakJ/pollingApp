const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const mongoOptions = { useNewUrlParser: true };

// localhost port
const port = 4001
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', socket => {

  console.log('New client connected')

  // insert data 
  socket.on('vote', (id, jsLib,result ) => {
    var myPolling = { id: id, jsLib: jsLib };
    console.log('socket.on : vote for:', id, jsLib);

    mongoClient.connect(url, function (err, db) {

      if (err) throw err;

      var dbo = db.db("JSPolling");
      console.log("db connect !");

      dbo.collection("tJSPollings").insertOne(myPolling,
        function (err, res) {
          if (err) throw err;
          console.log("collection  created !", id, jsLib);
          db.close();
        }
      );

      dbo.aggregate(
        [{
          "$group": {
            "่jsLib": "$name",
            "total_vote": { "$sum": 1 }
          }
        }],
        function (err, results) {
          if (err) throw err;
          console.log("aggregate get data complete !");
        });

    });
  })

  // send data to all real-time connected client 
  socket.on('vote', (id, jsLib,result) => {
    console.log('Vote for:', id, jsLib)
    io.sockets.emit('vote', id, jsLib, result)
  })

  // client disconnected
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

})

server.listen(port, () => console.log("Listening on port ${port}"))