const { Router } = require("express");
const { createuser } = require("../User/POST/createUser");
const { authLogin } = require("../User/POST/authLogin");
const { getUsers } = require("../User/GET/getUsers")

const router = Router();

router.post("/createUser", createuser);
router.post("/authLogin",authLogin)
router.get("/getUsers",getUsers)


module.exports = router;
