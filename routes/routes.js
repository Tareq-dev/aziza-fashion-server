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

router.get("/products", getProducts);
router.get("/product/:id", getSingleProductById);
router.get("/orders", getOrder);
router.get("/user/:email", getSingleUsers);
router.get("/users", getAllUsers);
router.get("/order/:email", getOrderByEmail);
router.get("/admin/:email", getAdmin);
router.put("/users/admin/:email", makeAdmin);
router.delete("/admin/:email", deleteAdmin);
router.post("/order", postOrder);
router.post("/product", addProduct);
router.put("/payment/:email/:id", updateOrder);
router.put("/shipment/:id", putShipment);
router.put("/user/:email", putUser);
router.delete("/product/:id", deleteProductById);

module.exports = router;
