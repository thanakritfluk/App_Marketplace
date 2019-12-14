var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";
/* GET home page. */
router.get('/', async function(req, res, next) {
  var paid
  var free
  await getTopPaid()
    .then(function success(result) {
       paid = result;
    })
  await getTopFree()
    .then(function success(result) {
       free = result;
    })
  res.render('index',  { 
    paid: paid,
    free: free
  });
});

router.get('/cate/:cate', function(req, res, next) {
  var cate = req.params.cate;
  res.render('index', { title: 'Express' ,test: 'Instragram'});
});

router.get('/search/:search', function(req, res, next) {
  var search = req.params.search;
  res.render('index', { title: 'Express' ,test: 'Instragram'});
});

var getTopPaid = function () {
  var promise = new Promise(function (resolve, reject) {
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        var all = []
        dbo.collection("Android_app_paid").find({}).sort({App_allrating:-1}).limit(2).toArray(function(err, result) {
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

var getTopFree = function () {
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

module.exports = router;
