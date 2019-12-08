var request = require("request");
const mongo = require('mongodb').MongoClient
const url = 'mongodb+srv://admin:TI5kgni0wrEkNCX3@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority'



var android_options = { method: 'GET',
  url: 'https://data.42matters.com/api/v2.0/android/apps/top_google_charts.json',
  qs: 
   { list_name: 'topselling_paid',
     cat_key: 'OVERALL',
     country: 'US',
     limit: '100',
     access_token: '87fcddb37dd051bd89f7979d8e0394b61e37a7f5' },
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
    //  'Accept-Encoding': 'gzip, deflate',
     Host: 'data.42matters.com',
     'Postman-Token': '94075fcb-e3e0-4446-8bb9-4546231b5d4c,653a7997-b1c3-4980-8a7b-315ca614abd8',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.20.1' } };


request(android_options, function (error, response, body) {
  if (error) throw new Error(error);

  for(var i = 0; i < 100; i++){
    let app_name = JSON.parse(body)["app_list"][i]["title"];
    let app_allrating = JSON.parse(body)["app_list"][i]["rating"];
    let app_genres = JSON.parse(body)["category_name"];
    let app_version = JSON.parse(body)["app_list"][i]["version"];
    let app_screenshot_url = JSON.parse(body)["app_list"][i]["screenshots"];
    let app_description = JSON.parse(body)["app_list"][i]["description"];
    let app_restriction = JSON.parse(body)["app_list"][i]["content_rating"];
    let app_download_amount = JSON.parse(body)["app_list"][i]["downloads_max"];
    let app_store_url = JSON.parse(body)["app_list"][i]["market_url"];
    let app_rating1 = JSON.parse(body)["app_list"][i]["ratings_1"];
    let app_rating2 = JSON.parse(body)["app_list"][i]["ratings_2"];
    let app_rating3 = JSON.parse(body)["app_list"][i]["ratings_3"];
    let app_rating4 = JSON.parse(body)["app_list"][i]["ratings_4"];
    let app_rating5 = JSON.parse(body)["app_list"][i]["ratings_5"];
    let app_icon = JSON.parse(body)["app_list"][i]["icon"];
    let app_price = JSON.parse(body)["app_list"][i]["price_numeric"];
    let app_video = JSON.parse(body)["app_list"][i]["promo_video"];
    let app_what_new = JSON.parse(body)["app_list"][i]["what_is_new"];

    // console.log(app_name)

    mongo.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
      // console.log("Database Connect")
      const db = client.db('App_marketplace')
      const collection = db.collection('Android_app_paid')
      
    
    
collection.insertOne({
  App_name: app_name,
  App_restricition: app_restriction,
  App_platform: "Android",
  App_genre: app_genres,
  App_version:app_version,
  App_screenshot_url: app_screenshot_url,
  App_description: app_description,
  App_allrating: app_allrating,
  App_download_amount: app_download_amount,
  App_store_url: app_store_url,
  App_ratings:[
    app_rating1,
    app_rating2,
    app_rating3,
    app_rating4,
    app_rating5
  ],
  App_icon: app_icon,
  App_price: app_price,
  App_video_url: app_video,
  App_what_new: app_what_new
  }, (err, result) => {
  
    if (err == null){
     console.log("Insert complete "+app_name)
    }

  });
  client.close();
});
  }
  

});





var Ios_options = { method: 'GET',
  url: 'https://data.42matters.com/api/v2.0/ios/apps/top_appstore_charts.json',
  qs: 
   { list_name: 'topselling_free',
     primaryGenreId: '36',
     device_type: 'iphone',
     country: 'US',
     limit: '100',
     access_token: '87fcddb37dd051bd89f7979d8e0394b61e37a7f5' },
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     Cookie: '42matters201702=3807a5022e0a6301f24bc16b8e9a3e02',
    //  'Accept-Encoding': 'gzip, deflate',
     Host: 'data.42matters.com',
     'Postman-Token': 'fa4ecbaf-2909-40af-b829-3112811ae982,9bf2d248-3e0a-4b7c-8d4e-b12ab636bc3c',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.17.1' } };

request(Ios_options, function (error, response, body) {
  if (error) throw new Error(error);

  for(var i = 0; i<100; i++){

  let app_name = JSON.parse(body)["app_list"][i]["trackCensoredName"];
  let app_allrating = JSON.parse(body)["app_list"][i]["averageUserRating"];
  let app_genres = JSON.parse(body)["primaryGenreName"];
  let app_version = JSON.parse(body)["app_list"][i]["version"];
  let app_screenshot_url = JSON.parse(body)["app_list"][i]["screenshotUrls"];
  let app_description = JSON.parse(body)["app_list"][i]["description"];
  let app_restriction = JSON.parse(body)["app_list"][i]["trackContentRating"];
  let app_download_amount = JSON.parse(body)["app_list"][i]["userRatingCount"];
  let app_store_url = JSON.parse(body)["app_list"][i]["trackViewUrl"];
  let app_icon = JSON.parse(body)["app_list"][i]["artworkUrl100"];
  let app_price = JSON.parse(body)["app_list"][i]["price"];
  let app_what_new = JSON.parse(body)["app_list"][i]["releaseNotes"];


  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  // console.log("Database Connect")
  const db = client.db('App_marketplace')
  const collection = db.collection('Ios_app_free')
  

collection.insertOne({
  App_name: app_name,
  App_restricition: app_restriction,
  App_platform: "Ios",
  App_genre: app_genres,
  App_version:app_version,
  App_screenshot_url: app_screenshot_url,
  App_description: app_description,
  App_allrating: app_allrating,
  App_download_amount: app_download_amount,
  App_store_url: app_store_url,
  App_icon: app_icon,
  App_price: app_price,
  App_what_new: app_what_new
  }, (err, result) => {
    if (err == null){
      console.log("Insert complete "+ app_name)
     }
});  
client.close();

});
}

});
