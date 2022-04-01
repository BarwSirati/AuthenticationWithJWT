const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

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
app.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send({ msg: "Required Username && Password" });
    }
    const user = process.env.AUTH_USERNAME;
    if (user && (await bcrypt.compare(password, process.env.AUTH_PASSWORD))) {
      const token = jwt.sign(
        {
          data: "This is a secretKey",
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 60,
        }
      );
      authToken = token;
      res.status(200).json(authToken);
    }
    res.send(400).send({ msg: "Invalid" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/data", auth, (req, res) => {
  try {
    res.status(200).send({ msg: "Authed" });
  } catch (err) {
    return res.status(403).send({ msg: "WHO ARE YOU??" });
  }
});

app.listen(3000, () => {
  console.log("Running");
});
