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
        dbo.collection("Android_app_free").find({}).sort({App_allrating:-1}).limit(2).toArray(function(err, result) {
          if (err) reject(err);
          var ans = []
          for(let i=0; i<2; i++){
            ans.push(result[i])
          }
          resolve(ans);
          db.close();
        });
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
