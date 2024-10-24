const { Router } = require("express");
const { createuser } = require("../User/POST/createUser");
const { authLogin } = require("../User/POST/authLogin");



const router = Router();

router.post("/createUser", createuser);
router.post("/authLogin",authLogin)

module.exports = router;
