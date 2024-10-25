const { response } = require("express");
const { GetOneItem } = require("../../Utility/Mongo/getOneItem");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// const { usuarios } = require("../../Model/Usuarios")

const authLogin = async (req, res = response) => {
  try {
    const {email, password} = req.body

    if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos." });
    }
  
    const lowerCaseEmail = email.toLowerCase();//correo a minusculas

    const user= await GetOneItem("user", "usuarios", {email: lowerCaseEmail})

    if (!user){
      return res.status(400).json({message: "El usuario no existe"})
    }

    // Logica para desencriptar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Ingresa un email o contraseña correcta." });
    }

    const token = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    )

    return res.status(200).json({message: "inición de sesión exitoso", token})
    
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  authLogin
};

