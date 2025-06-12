const express = require("express");
const { getForgotPaswordView } = require("../controllers/passwordController");
const router = express.Router();

router.route("/forgot-password").get(getForgotPaswordView);


module.exports = router;