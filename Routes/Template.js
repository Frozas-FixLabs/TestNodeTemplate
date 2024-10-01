const { Router } = require("express");
const { defaultfunction } = require("../Template/defaultfunction");


const router = Router();

router.get("/", defaultfunction);

module.exports = router;
