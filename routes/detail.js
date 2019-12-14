var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";
var DataBaseName = "App_marketplace"; 
var collection_available = [];


async function find_is_exist(app_name,collection_name){
  const client = await MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true })
      .catch(err => { console.log(err); });
  if (!client) {
      return;
  }
  try {
      const db = client.db(DataBaseName);

      let collection = db.collection(collection_name);
      let res = await collection.findOne({App_name: app_name});
      if(res == null){
          console.log('Not Found In '+collection_name)
      }else{
        collection_available.push(collection_name)
      }
  } catch (err) {
      console.log(err);
  } finally {
      client.close();
  }
}



/* GET home page. */
router.get('/:name', async function(req, res, next) {
  var app_name = req.params.name;
 
  var ios_free = await find_is_exist(app_name,'Ios_app_free');
  var android_free = await find_is_exist(app_name,'Android_app_free');
  var ios_paid = await find_is_exist(app_name,'Ios_app_paid');
  var android_paid = await find_is_exist(app_name,'Android_app_paid');

  await getDetail(app_name)
  .then(function success(result) {
    console.log(collection_available)
     res.render('detail', { detail: result[0], url:collection_available});
     collection_available = [];
  })
});

var getDetail = function (name) {
  var promise = new Promise(function (resolve, reject) {
    var search = name.replace("%20", "_");
    MongoClient.connect(url, function(err, db){
      if(err){
        reject('Cannot connect to the server');
      } else {
        console.log('Connection Established');
        var dbo = db.db("App_marketplace");
        dbo.collection("Android_app_paid").find({App_name: search}).limit(1).toArray((function(err, result) {
          if (err) {
            console.log(err);
          }
          var ans = []
          for(let i=0; i<1; i++){
            ans.push(result[i])
          }
          if(ans[0] == null){
            console.log(".....")
          }else{
            // console.log(ans)
            resolve(ans);
          }
          db.close();
        }));
        dbo.collection("Android_app_free").find({App_name: search}).limit(1).toArray((function(err, result) {
          if (err) reject(err);
          var ans = []
          for(let i=0; i<1; i++){
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
