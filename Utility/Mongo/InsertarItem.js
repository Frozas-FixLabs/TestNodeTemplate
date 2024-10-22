const mongoose = require('mongoose');
const { SetConnectionMongoDB, CloseConnection } = require("../../Config/ConnectionMongoDB");

let InsertarItem = async (database, collection, objeto) => {
  try {
    await SetConnectionMongoDB(database);    
    const coleccion = mongoose.connection.collection(collection); // Obtiene la colección
    const resultado = await coleccion.insertOne(objeto);
    return resultado;
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  } finally {
    await CloseConnection()
  }
};

module.exports = {
  InsertarItem,
};
