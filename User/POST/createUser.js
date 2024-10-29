const { response } = require("express");
const { InsertarItem } = require("../../Utility/Mongo/InsertarItem");
const { GetOneItem } = require("../../Utility/Mongo/getOneItem");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = process.env.DB_NAME;

const createuser = async (req, res = response) => {
  try {
    const { name, lastName, email, password } = req.body

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|cl|edu|gov|mil|biz|info|name|pro|aero|coop|museum)(\.[a-z]{2})?$/;

    if (!nameRegex.test(lastName)){
      return res.status(400).json({message: "El apellido solo puede contener letras"})
    }
    if (!emailRegex.test(email)){
      return res.status(400).json({message: "Ingresa un correo electronico válido"})
    }

    //pasar correo a minusculas
    const lowerCaseEmail = email.toLowerCase();

    //verificacion de correo ya registrado
    const existingUser= await GetOneItem( db, "user", {email})
    if (existingUser) { 
      return res.status(400).json({ message: "Este correo ya se encuentra registrado" });
    }

    let rol = "user";

    //Logica para encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser= {
      name: initialCapitalName,
      lastName: initialCapitalLastName,
      email: lowerCaseEmail,
      password: hashedPassword,
      rol: rol,
    }

    const resultadoInsercion= await InsertarItem(db, "user", newUser);
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email, rol: newUser.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      if (!resultadoInsercion || !resultadoInsercion.insertedId) {
        return res.status(400).json({ message: "No se pudo crear el usuario" });
      }

    return res.status(200).json({
    message: "Usuario user creado exitosamente", token});

  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "No se pudo crear el usuario" });
  }
};

module.exports = {
  createuser,
};
