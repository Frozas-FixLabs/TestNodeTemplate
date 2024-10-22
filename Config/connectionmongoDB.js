const mongoose = require('mongoose');
require('dotenv').config();

let SetConnectionMongoDB = async (database) => {
  try {
    const uri = `${process.env.STRING_CONNECTION_MONGO}/${database}`;
    await mongoose.connect(uri);
    console.log("Conexión establecida con la base de datos");
  } catch (err) {
    throw new Error("No se pudo establecer conexión con la base de datos: " + err.message);
  }
}

let CloseConnection = async () => {
  await mongoose.connection.close();
  console.log("Conexión cerrada");
}

module.exports = {
  SetConnectionMongoDB,
  CloseConnection
};
