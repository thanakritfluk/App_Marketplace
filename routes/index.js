var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://admin:"+process.env.MONGO_PASS+"@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/List', function(req, res, next) {
   MongoClient.connect(url, function(err, db){
     if(err){
       console.log('Cannot connect to the server');
     } else {
      console.log('Connection Established');

      var collection = db.collection('App_marketplace');

      collection.find({}).toArray(function(err, result) {
        if (err){
          res.send(err);
        }else if (result.length) {
          res.render('App_marketplace_list', {
            "App_marketplace_list" : result
          });
        } else {
          res.send('No documents found');
        }

        db.close();
      });
     }
   });
});



module.exports = router;
