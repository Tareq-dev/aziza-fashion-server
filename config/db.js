const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://aziza:BC3j4YLHAgUXumM6@aziza.h5qyukr.mongodb.net/?retryWrites=true&w=majority";
let db = null;

async function connect() {
  if (db) return db;
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db("azizaFashion");
    console.log("Connected");
    return db;
  } catch (error) {
    console.log("Error connecting to MongoDB database", error);
  }
}

module.exports = { connect };

//dbuser : aziza
//dbpass : BC3j4YLHAgUXumM6
// const productsCollection = client.db("azizaFashion").collection("products");
// const ordersCollection = client.db("azizaFashion").collection("orders")
// const usersCollection = client.db("azizaFashion").collection("users")
