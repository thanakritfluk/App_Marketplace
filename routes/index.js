var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";
/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/0')
});

router.get('/:id', async function(req, res, next) {
  var skip = req.params.id;
  var paid
  var free
  await getTopPaid(skip)
    .then(function success(result) {
       paid = result;
    })
  await getTopFree(skip)
    .then(function success(result) {
       free = result;
    })
  res.render('index',  { 
    paid: paid,
    free: free,
    now: skip
  });
});

var getTopPaid = function (skip) {
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        var all = []
        dbo.collection("Android_app_paid").find({}).sort({Id:1}).skip(skip*2).limit(2).toArray(function(err, result) {
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

var getTopFree = function (skip) {
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        dbo.collection("Android_app_free").find({}).sort({Id:1}).skip(skip*2).limit(2).toArray(function(err, result) {
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

module.exports = router;
