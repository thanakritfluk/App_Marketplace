const axios = require("axios");
var env = require('dotenv').config();
// url for database
var url = "mongodb+srv://admin:"+process.env.MONGO_PASS+"@cluster0-ngbcy.mongodb.net/test?retryWrites=true&w=majority";
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
var DataBaseName = "App_marketplace"; 
// option to api
const token = process.env.TOKEN;
const limit_number = "100";
// url to api
const android_free_url = "https://data.42matters.com/api/v2.0/android/apps/top_google_charts.json?list_name=topselling_free&cat_key=OVERALL&country=US&limit="+limit_number+"&access_token="+token;
const android_paid_url = "https://data.42matters.com/api/v2.0/android/apps/top_google_charts.json?list_name=topselling_paid&cat_key=OVERALL&country=US&limit="+limit_number+"&access_token="+token;
const ios_free_url = "https://data.42matters.com/api/v2.0/ios/apps/top_appstore_charts.json?list_name=topselling_free&cat_key=OVERALL&country=US&limit="+limit_number+"&access_token="+token;
const ios_paid_url = "https://data.42matters.com/api/v2.0/ios/apps/top_appstore_charts.json?list_name=topselling_paid&cat_key=OVERALL&country=US&limit="+limit_number+"&access_token="+token;


const getData = async url => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


async function deletes_all(collection_name){
    const client = await MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db(DataBaseName);

        let collection = db.collection(collection_name);
        let res = await collection.deleteMany({});

    } catch (err) {
        console.log(err);
    } finally {
        console.log("Removed "+collection_name)
        client.close();
        
    }

}


async function insertOne(os_name,data,collection_name,time) {

    const client = await MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {

        const db = client.db(DataBaseName);

        let collection = db.collection(collection_name);
        let query;
        if(os_name=="Android"){
            query = { 
                App_name: data["title"],
                App_restriction: data["content_rating"],
                App_platform: "Android",
                App_genre: data["cat_keys"][1],
                App_version:data["version"],
                App_screenshot_url: data["screenshots"],
                App_description: data["description"],
                App_allrating: Number.parseFloat(data["rating"]).toFixed(2),
                App_download_amount: data["downloads_max"],
                App_store_url: data["market_url"],
                App_ratings:[
                    data["ratings_1"],
                    data["ratings_2"],
                    data["ratings_3"],
                    data["ratings_4"],
                    data["ratings_5"]
                ],
                App_icon: data["icon"],
                App_price: Number.parseFloat(data["price_numeric"]).toFixed(2),
                App_video_url: data["promo_video"],
                App_what_new: data["what_is_new"],
              Id: time
            
            }

        }
        if(os_name=="Ios"){
            var genres_ios;
            if(data["genres"][0]=="Games"){
              genres_ios = "GAME"
            }else{
              genres_ios = "APPLICATION"
            }
          
            query = {
                App_name: data["trackCensoredName"],
                App_restriction: data["trackContentRating"],
                App_platform: "Ios",
                App_genre: genres_ios,
                App_version:data["version"],
                App_screenshot_url: data["screenshotUrls"],
                App_description: data["description"],
                App_allrating: Number.parseFloat(data["averageUserRating"]).toFixed(2),
                App_download_amount: data["userRatingCount"],
                App_store_url: data["trackViewUrl"],
                App_icon: data["artworkUrl100"],
                App_price: Number.parseFloat(data["price"]).toFixed(2),
                App_what_new: data["releaseNotes"],
              Id: time
            }
        }

        let res = await collection.insertOne(query);

        if(os_name=="Android"){
        console.log("Inserted "+"No."+time+" "+collection_name+": " + data["title"]);
        }
        if(os_name=="Ios"){
            console.log("Inserted "+"No."+time+" "+collection_name+": " + data["trackCensoredName"]);
        }

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}


async function insert_data(os_name,url,collection_name){
    var data = await getData(url);

    for(var i = 0; i<100 ; i++){
        var insert = await insertOne(os_name,data["app_list"][i],collection_name,(i+1))
    }

}

async function setup_all_data(){
    var delete_android_paid = await deletes_all('Android_app_paid');
    var delete_android_paid = await deletes_all('Android_app_free');
    var delete_android_paid = await deletes_all('Ios_app_paid');
    var delete_android_paid = await deletes_all('Ios_app_free');
    var android_paid_app = await insert_data("Android",android_paid_url,'Android_app_paid');
    var android_free_app = await insert_data("Android",android_free_url,'Android_app_free');
    var ios_paid_app = await insert_data("Ios",ios_paid_url,"Ios_app_paid")
    var ios_free_app = await insert_data("Ios",ios_free_url,"Ios_app_free")
}


setup_all_data();