const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  try {
    res.send({ msg: "Authed" });
  } catch (err) {
    return res.status(403).send({ msg: "WHO ARE YOU??" });
  }
});

module.exports = router;
