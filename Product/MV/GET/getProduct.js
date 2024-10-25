const axios = require('axios');


const API_URL = env(API_URL);
const API_KEY = env(API_KEY);


const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};


const getSales = async () => {
  try {
    const response = await axios.get(API_URL, { headers });
    console.log('Ventas:', response.data);
  } catch (error) {
    console.error('Error al consultar ventas:', error.response ? error.response.data : error.message);
  }
};


module.exports = {
    getSales
}