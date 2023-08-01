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
