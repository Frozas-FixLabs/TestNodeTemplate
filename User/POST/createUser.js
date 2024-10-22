const { response } = require("express");
const { InsertarItem } = require("../../Utility/Mongo/InsertarItem");

const createuser = async (req, res = response) => {
  try {
    user = req.body;
    console.log(user);
    
   //aplicar logicas que estimen convenientes

    await InsertarItem("User", "Usuarios", user);
    res.send("Usuario Creado").status(200);

  } catch (error) {
    console.log(error);
    res.send("No se pudo crear el usuario").status(401);
  }
};

module.exports = {
  createuser,
};
