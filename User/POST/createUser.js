const { response } = require("express");
const { InsertarItem } = require("../../Utility/Mongo/InsertarItem");
const { GetOneItem } = require("../../Utility/Mongo/getOneItem");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createuser = async (req, res = response) => {
  try {
    const {name, lastName, email, password} = req.body
    
    if(!name || !lastName || !email || !password){
      return res.status(400).json({message: "Todos los campos son requeridos"})
    }

    //cambio a mayuscula primer letra del nombre y apellido
    function capitalChange(str){
      return str[0].toUpperCase() + str.substring(1).toLowerCase()
    }
    const initialCapitalName= capitalChange(name)
    const initialCapitalLastName= capitalChange(lastName)

    //verificacion de caracteres en nombre apellido y correo
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(lastName)){
      return res.status(400).json({message: "El apellido solo puede contener letras"})
    }
    if (!emailRegex.test(email)){
      return res.status(400).json({message: "Ingresa un correo electronico válido"})
    }

    //pasar correo a minusculas
    const lowerCaseEmail = email.toLowerCase();

    //verificacion de correo ya registrado
    const existingUser= GetOneItem( "user", "usuarios", {email})
    if (existingUser.email){
      return res.status(400).json({message: "Este correo ya se encuentra registrado"})
    }

    //Logica para encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser= {
      name: initialCapitalName,
      lastName: initialCapitalLastName,
      email: lowerCaseEmail,
      password: hashedPassword
    }

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await InsertarItem("user", "usuarios", newUser);
    return res.status(200).json({message: "usuario creado con exito", token})

  } catch (error) {
    console.log(error);
    res.send("No se pudo crear el usuario").status(401);
  }
};

module.exports = {
  createuser,
};
