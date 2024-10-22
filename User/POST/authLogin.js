const { response } = require("express");
const { GetOneItem } = require("../../Utility/Mongo/getOneItem");


const authLogin = async (req, res = response) => {
  try {
    GetOneItem("User", "Usuarios", {})
    //Aplicar Logicas de Validacion
  } catch (error) {

  }
};



module.exports = {
  authLogin
};

