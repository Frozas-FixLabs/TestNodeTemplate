const { response } = require("express");
const { GetOneItem } = require("../../Utility/Mongo/getOneItem");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const db = process.env.DB_NAME;

const authLogin = async (req, res = response) => {
  try {
    const {email, password} = req.body

    if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos." });
    }
  
    const lowerCaseEmail = email.toLowerCase();//correo a minusculas

    const user= await GetOneItem(db, "user", {email: lowerCaseEmail})

    if (!user){
      return res.status(400).json({message: "El usuario no existe"})
    }

    // Logica para desencriptar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Ingresa un email o contraseña correcta." });
    }

    const rol= user.rol

    const token = jwt.sign(
      {userId: user._id, email: user.email, rol: user.rol},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    )

  
    return res.status(200).json({
      message: rol === "user" ? "Inicio de sesión exitoso de usuario user" : "Inicio de sesión exitoso del usuario admin", token })
    
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = {
  authLogin
};

