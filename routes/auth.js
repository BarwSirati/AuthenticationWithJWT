const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
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
          expiresIn: "12h",
        }
      );
      authToken = token;
      res.status(200).send({ token: authToken });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
