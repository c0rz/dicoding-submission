const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Route = require("./routes");
const port = process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/books", Route);

// error handling
app.use((req, res, next) => {
  let err = new Error("Route not found");
  err.status = 404;
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
