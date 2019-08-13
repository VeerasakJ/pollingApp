var mongoClient = require('mongodb').MongoClient;
var url= "mongodb://localhost:27017/";

mongoClient.connect(url,function (err,db) {
	if (err) throw err;
	var dbo = db.db("JSPolling");
    
    dbo.createCollection("tJSPollings",
	function(res, res ){
        if (err) throw err;
	    console.log("collection  created!");
	    db.close();	 	
    });
    
});