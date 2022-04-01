const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
  try {
    res.status(200).send({
      msg: "VGhpcyBpcyBhIHNlY3JldCBhcGkuIFdIWSBBUkUgWU9VIEtOT1cgVEhJUyBJUD8/",
    });
  } catch (error) {
    console.log(error);
  }
});
app.use("/auth", require("./routes/auth"));
app.use("/data", require("./routes/getData"));

module.exports = app;
