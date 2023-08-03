const { connect } = require("../config/db");
const { ObjectId } = require("mongodb");

//     // GET == products

module.exports.getProducts = async (req, res, next) => {
  try {
    const db = await connect();
    const result = await db.collection("products").find().toArray();
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// GET == single products

module.exports.getSingleProductById = async (req, res, next) => {
  try {
    const db = await connect();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await db.collection("products").findOne(query);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

//Delete Product

module.exports.deleteProductById = async (req, res, next) => {
  try {
    const db = await connect();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await db.collection("products").deleteOne(query);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

//POST PRODUCT

module.exports.addProduct = async (req, res, next) => {
  try {
    const db = await connect();
    const products = req.body;
    console.log(products);
    const result = await db.collection("products").insertOne(products);
    console.log(result);
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
};

// GET == orders

module.exports.getOrder = async (req, res, next) => {
  try {
    const db = await connect();
    const result = await db.collection("orders").find().toArray();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// POST == orders

module.exports.postOrder = async (req, res, next) => {
  try {
    const db = await connect();
    const orders = req.body;
    const result = await db.collection("orders").insertOne(orders);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// GET == orders by email

module.exports.getOrderByEmail = async (req, res, next) => {
  try {
    const db = await connect();
    const email = req.params.email;
    const query = { email: email };
    const result = await db.collection("orders").find(query).toArray();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// PUT

module.exports.updateOrder = async (req, res, next) => {
  try {
    const db = await connect();
    const email = req.params.email;
    const orderId = req.params.id;
    const filter = { email: email, _id: ObjectId(orderId) };
    const updatedDoc = {
      $set: {
        paid: true,
      },
    };
    const updatedOrder = await db
      .collection("orders")
      .updateOne(filter, updatedDoc);

    console.log(updatedOrder);

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

//     //Shipment

module.exports.putShipment = async (req, res, next) => {
  try {
    const db = await connect();
    const orderId = req.params.id;

    const filter = { _id: ObjectId(orderId) };
    const updatedDoc = {
      $set: {
        shipment: true,
      },
    };
    const result = await db.collection("orders").updateOne(filter, updatedDoc);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
//Get user

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const db = await connect();
    const result = await db.collection("users").find().toArray();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
//Get single user

module.exports.getSingleUsers = async (req, res, next) => {
  try {
    const db = await connect();
    const email = req.params.email;
    const query = { email: email };
    const result = await db.collection("users").findOne(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//    make admin put

module.exports.makeAdmin = async (req, res, next) => {
  try {
    const db = await connect();
    const email = req.params.email;
    const filter = { email: email };
    const updateDoc = {
      $set: { role: "admin" },
    };
    const result = await db.collection("users").updateOne(filter, updateDoc);
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//  user PUT

module.exports.putUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const filter = { email: email };
    const option = { upsert: true };
    const updatedDoc = { $set: user };
    const result = await usersCollection.updateOne(filter, updatedDoc, option);
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// delete user

module.exports.deleteUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const result = await usersCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
// GET ADMIN

module.exports.deleteUser = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email: email });
    const isAdmin = user?.role === "admin";
    res.send({ admin: isAdmin });
  } catch (error) {
    next(error);
  }
};
