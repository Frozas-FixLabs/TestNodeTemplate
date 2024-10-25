const { SetConnectionMongoDB, CloseConnection } = require("../../Config/ConnectionMongoDB");
const mongoose = require('mongoose');


const GetCollection = async (database, collection) => {

    try {
      await SetConnectionMongoDB(database); 
      const coll = mongoose.connection.collection(collection);

      const resp = await coll.find().toArray(); 
      return JSON.stringify(resp);
      

    } catch (err) {
      console.error("Error al conectar a MongoDB:", err);
    } 
}

module.exports = {
  GetCollection

}