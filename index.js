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
