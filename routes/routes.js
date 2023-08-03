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
  deleteUser,
} = require("../controllers/api_s");
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getSingleProductById);
router.get("/orders", getOrder);
router.get("/orders", getOrder);
router.get("/user/:email", getSingleUsers);
router.get("/order/:email", getOrderByEmail);
router.put("/users/admin/:email", makeAdmin);
router.delete("/user/:email", deleteUser);
router.post("/order", postOrder);
router.post("/product", addProduct);
router.put("/payment/:email/:id", updateOrder);
router.put("/shipment/:id", putShipment);
router.put("/user/:email", putUser);
router.delete("/product/:id", deleteProductById);

module.exports = router;
