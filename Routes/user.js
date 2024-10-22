const { Router } = require("express");
const { createuser } = require("../User/POST/createUser");
const { authLogin } = require("../User/POST/AuthLogin");



const router = Router();

router.post("/creatUser", createuser);
router.post("/authLogin",authLogin)

module.exports = router;
