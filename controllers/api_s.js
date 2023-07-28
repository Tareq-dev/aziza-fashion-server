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
  