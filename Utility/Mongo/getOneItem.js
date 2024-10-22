const { SetConnectionMongoDB } = require("../../Config/ConnectionMongoDB");


const GetOneItem = async (database, collection, filter={}) => {

    try {
        await SetConnectionMongoDB(database);
        const coleccion = mongoose.connection.collection(collection); 
        const resultado = await coleccion.findOne(filter);
        return resultado;
      } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
      } finally {
        await CloseConnection()
      }
    // const db = SetConnectionMongoDB().db(database)
    // const mongoOrders = await db.collection(collection).;
    // return mongoOrders;
  }

module.exports = {
    GetOneItem
}