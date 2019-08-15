const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const port = 4001

const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const mongoOptions = { useNewUrlParser: true };



io.on('connection', socket => {

  console.log('New client connected')
  
  // get data
  socket.on("initial_data", () => {
    
    mongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("JSPolling");
      console.log("db init connected ! ");
     
      // dbo.collection("tJSPollings").find({}, 
      //     { 
      //         "jsLib" : "$jsLib", 
      //         "_id" : 0
      //     }).toArray( function( err,results) {
      //        if (err) throw err;  
      //        console.log( "find data : ", results);
      //        sockets.emit("get_data", results );
      //        db.close();
      //  });

       dbo.collection("tJSPollings").find({}, 
        { 
            "jsLib" : "$jsLib"
        }).toArray( function( err,results) {
           if (err) throw err;  
           console.log( "find data : ", results);
           io.sockets.emit("get_data", results  );
           db.close();
     });
    });  
  });
  ///

  // insert data 
  socket.on('vote', (id, jsLib) => {
    var myPolling = { id: id, jsLib: jsLib };
    mongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("JSPolling");
      console.log("db vote connected ! ");

      dbo.collection("tJSPollings").insertOne(myPolling,
        function (err, res) {
          if (err) throw err;
          console.log("vote created ", id, jsLib);
          db.close();
        }
      );

    });
  })
  ///

  // client disconnected
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

})

server.listen(port, () => console.log("Listening on port ${port}"))