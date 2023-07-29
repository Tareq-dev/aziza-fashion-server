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
