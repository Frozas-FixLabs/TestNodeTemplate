const { getAllItems } = require("../../../Utility/Mongo/getAllItems");
require("dotenv").config();
const db = process.env.DB_NAME;


const getCheckout = async (req, res) => {

  
  try {

    const checkouts = await getAllItems(db, "checkout");

    if (checkouts && checkouts.length > 0) {
      const checkoutsData = checkouts.map(checkout => ({
        _id: checkout._id,
        id: checkout.id,
        order_name: checkout.order_name,
        created_at: checkout.created_at,
        client_id: checkout.client_id,
        origin: checkout.origin,
        payment_method: checkout.payment_method,
        payment_status: checkout.payment_status,
        status: checkout.status,
        total_price: checkout.total_price
    }));
      res.status(200).json({message: "Items encontrados", checkoutsData}); 
    } else {
      res.status(404).json({ message: 'No se encontraron items en la colección' });
    }


  } catch (err) {
    console.error("Error al obtener la colección checkout:", err);
    res.status(500).json({ error: "Error al obtener la colección checkout" });
  }
};

module.exports = {
  getCheckout
};