const express = require("express");
require("dotenv").config();
const app = express();
const Route = require("./routes");
const port = process.env.PORT;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

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
