var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  getDetail(name)
  .then(function success(result) {
     res.render('detail', { detail: result});
  })
});

var getDetail = function (name) {
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        dbo.collection("Android_app_free").findOne({App_name: name}).then((function(err, result) {
          if (err) reject(err);
          resolve(result);
          db.close();
        }));
      }
    }); 
  });
  return promise;
};
module.exports = router;
