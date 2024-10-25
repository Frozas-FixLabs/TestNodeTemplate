const { SetConnectionMongoDB, CloseConnection } = require("../../Config/ConnectionMongoDB");
const mongoose = require('mongoose');


const getAllItems = async (database, collection) => { 

    try {
        await SetConnectionMongoDB(database);
        const coleccion = mongoose.connection.collection(collection); 
        const resultado = await coleccion.find({}).toArray();
          return resultado;
      } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
      } finally {
        await CloseConnection()
      }
  }

module.exports = {
    getAllItems
}