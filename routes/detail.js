var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://reader:mr3TWRw1RcJeAQIt@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";
var DataBaseName = "App_marketplace";
var ios_url_available;
var android_url_available;

async function find_is_exist(app_detail, app_name, collection_name) {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => {
    console.log(err);
  });
  if (!client) {
    return;
  }
  try {
    const db = client.db(DataBaseName);
    let collection = db.collection(collection_name);
    let res = await collection.findOne({ App_name: app_name });
    if (res == null) {
      console.log("Not Found In " + collection_name);
    } else {
      if (
        collection_name == "Android_app_paid" ||
        collection_name == "Android_app_free"
      ) {
        android_url_available = res["App_store_url"];
      } else {
        ios_url_available = res["App_store_url"];
      }
      app_detail.push(res);
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

/* GET home page. */
router.get("/:name", async function(req, res, next) {
  var app_name = await req.params.name;
  var app_detail = await [];
  var android_paid = await find_is_exist(
    app_detail,
    app_name,
    "Android_app_paid"
  );
  var android_free = await find_is_exist(
    app_detail,
    app_name,
    "Android_app_free"
  );
  var ios_free = await find_is_exist(app_detail, app_name, "Ios_app_free");
  var ios_paid = await find_is_exist(app_detail, app_name, "Ios_app_paid");

  res.render("detail", {
    detail: app_detail[0],
    ios_url: ios_url_available,
    android_url: android_url_available
  });
});

module.exports = router;
