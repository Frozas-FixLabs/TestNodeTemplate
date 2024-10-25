const { Router } = require("express");
const { getCheckout } = require("../Checkout/Odoo/GET/getCheckout");



const router = Router();

router.get("/getCheckout", getCheckout);


module.exports = router;
