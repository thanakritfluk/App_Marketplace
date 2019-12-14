var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  getTopPaid()
    .then(function success(result) {
       res.render('index',  { 
            data: result,
            title: 'DAQ Basketball prediction',
            current_year: current_year,            
        });
    })
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
        dbo.collection("Android_app_free").find({}).sort({App_allrating:1}).limit(2).toArray(function(err, result) {
          if (err) reject(err);
          resolve(result);
          db.close();
        });
      }
    }); 
  });
  return promise;
};

module.exports = router;
