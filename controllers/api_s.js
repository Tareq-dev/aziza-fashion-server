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