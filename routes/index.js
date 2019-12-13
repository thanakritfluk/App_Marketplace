var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";

var getDashboard = function () {
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        // dbo.collection("Android_app_free").find({}, { projection: { _id: 0, App_name:1} }).toArray(function(err, result) {
        //   if (err) reject(err);
        //   resolve(result[0]);
        //   db.close();
        // });
        dbo.collection("Android_app_free").findOne({}, { projection: { _id: 0, App_name: 1}}, function(err, result) {
          if (err) reject(err);
          resolve(result);
          db.close();
        });
        // resolve(dbo.collection("Android_app_free").count())
      }
    }); 
  });
  return promise;
};

/* GET home page. */
router.get('/', function(req, res, next) {
  getDashboard()
  .then(function success(result) {
    res.render('index',  { 
         data: result,
         title: 'Express',           
     });
 })
});

module.exports = router;
