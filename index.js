const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./config/db");
const router = require("./routes/routes");

app.use(cors());
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());

connect();

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Running Form backend");
});
app.listen(port, () => {
  console.log("Listening to port", port);
});

// async function run() {
//   try {
//     await client.connect();
//     const productsCollection = client.db("azizaFashion").collection("products");
//     const ordersCollection = client.db("azizaFashion").collection("orders");
//     const usersCollection = client.db("azizaFashion").collection("users");


//     // user PUT
//     app.put("/user/:email", async (req, res) => {
//       const email = req.params.email;
//       const user = req.body;
//       const filter = { email: email };
//       const option = { upsert: true };
//       const updatedDoc = { $set: user };
//       const result = await usersCollection.updateOne(
//         filter,
//         updatedDoc,
//         option
//       );
//       res.send(result);
//     });

//     // delete user
//     app.delete("/user/:email", async (req, res) => {
//       const email = req.params.email;
//       const query = { email: email };
//       const result = await usersCollection.deleteOne(query);
//       res.send(result);
//     });

//     // GET ADMIN
//     app.get("/admin/:email", async (req, res) => {
//       const email = req.params.email;
//       const user = await usersCollection.findOne({ email: email });
//       const isAdmin = user?.role === "admin";
//       res.send({ admin: isAdmin });
//     });
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);
