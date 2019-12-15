var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";

/* GET home page. */
router.get('/:search', async function(req, res, next) {
    var name = req.params.search;
    getApp(name)
        .then(function success(result) {
            console.log(result.length)
            res.render('search', { App: result})
        });
});

var getApp = function (name) {
  var promise = new Promise(function (resolve, reject) {
    var search = name.replace("%20", "_");
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        dbo.collection("Android_app_paid").find({App_name: search}).toArray((function(err, result) {
          if (err) {
            console.log(err);
          }
          var ans = []
          for(let i=0; i<result.length; i++){
            ans.push(result[i])
          }
          if(ans[0] == null){          
          }else{
            resolve(ans);
          }
          db.close();
        }));
        dbo.collection("Android_app_free").find({App_name: search}).toArray((function(err, result) {
          if (err) reject(err);
          var ans = []
          for(let i=0; i<result.length; i++){
            ans.push(result[i])
          }
          resolve(ans);
          db.close();
        }));
      }
    }); 
  });
  return promise;
};
module.exports = router;