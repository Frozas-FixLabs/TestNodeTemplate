const { response } = require("express");



const defaultfunction = async (req, res = response) => {
    res.send("Hola Mundo").status(200)
};

module.exports = {
    defaultfunction
};
