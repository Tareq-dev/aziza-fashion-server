const express = require("express");
const {
  getProducts,
  getSingleProductById,
  deleteProductById,
  addProduct,
  getOrder,
  postOrder,
  getOrderByEmail,
  updateOrder,
  putShipment,
  putUser,
  getAllUsers,
  getSingleUsers,
  makeAdmin,
  deleteAdmin,
  getAdmin,
} = require("../controllers/api_s");
const router = express.Router();

//----------------- Products Route
router.get("/products", getProducts);
router.get("/product/:id", getSingleProductById);
router.post("/product", addProduct);
router.delete("/product/:id", deleteProductById);

//----------------- Orders Route
router.get("/orders", getOrder);
router.get("/order/:email", getOrderByEmail);
router.post("/order", postOrder);

//----------------- USERs Route
router.get("/user/:email", getSingleUsers);
router.put("/users/admin/:email", makeAdmin);
router.get("/users", getAllUsers);
router.put("/user/:email", putUser);

//----------------- Admin Route
router.get("/admin/:email", getAdmin);
router.delete("/admin/:email", deleteAdmin);
router.put("/payment/:email/:id", updateOrder);
router.put("/shipment/:id", putShipment);

module.exports = router;
