var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

 MongoClient.connect(url, function(err, db) {
   
   if (err) throw err;
   var dbo = db.db("JSPolling");
   
   var myPolling = {id:2, jsLib : "EMBER" };

   dbo.collection("tJSPollings").insertOne ( myPolling,
     function(err, res ){
      if (err) throw err;
    	console.log("collection  created!");
 	    db.close();	 	
     });
});