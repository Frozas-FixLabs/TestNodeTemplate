const { getAllItems } = require("../../../Utility/Mongo/getAllItems");


const getCheckout = async (req, res) => {
  const database = "Checkouts";
  const collection = "checkout";

  
  try {

    const checkouts = await getAllItems(database, collection);

    if (checkouts && checkouts.length > 0) {
      const checkoutsData = checkouts.map(checkout => ({
        _id: checkout._id,
        id: checkout.id,
        order_name: checkout.order_name,
        created_at: checkout.created_at,
        client_id: checkout.client_id,
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