// Set up mongoose connection
import pkg from "mongoose";
const { MongoClient, ServerApiVersion } = pkg;

let dev_db_url = process.env.MONGODB_URI_LOCAL;
const mongoDB = dev_db_url || process.env.MONGODB_URI;
//const mongoDB = dev_db_url;

const client = new MongoClient(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log(collection + " collection");
  console.log(client + " client");
});
export const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// mongoose.connect(mongoDB, {
//      useCreateIndex: true,
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//      useFindAndModify: false,
//    });
//    mongoose.Promise = global.Promise;
//    export const db = mongoose.connection;

//    db.on("error", console.error.bind(console, "MongoDB connection error:"));
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { MongoClient, ServerApiVersion } = require('mongodb');
'




export const createCountry = async (req, res, next) => {
  try {
    let country = new Countries({
      name: req.body.name,
      description: req.body.description,
      bgImage: req.body.bgImage,
      image: req.body.image,
    });
    const Country = await country.save();
    const Continent = Continents.findOne({ name: Country.name });
    if (Continent) {
      continent.Countries.push(Country);
      continent.save();
      let response = {
        success: "true",
        statuscode: 200,
        data: country,
        message: "success",
      };
      // if (country) {
      //   let response = {
      //     success: "true",
      //     statuscode: 200,
      //     data: country,
      //     message: "success",
      //   };
      res.json(response);
    }
  } catch (error) {
    let response = {
      statuscode: 400,
      data: [],
      error: [error],
      message: "something failed",
    };
    return res.json(response);
  }
};


'