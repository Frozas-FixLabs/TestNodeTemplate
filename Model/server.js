const express = require("express");
const cors = require("cors");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //PATH
    this.paths={
        TEMPLATE:"/template"
    }

    //middlewares
    this.middlewares();

    //rutas de app
    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));

    this.app.use(express.json());

    this.app.use(cors());
  }

  routes() {
    this.app.use(this.paths.TEMPLATE, require("../Routes/Template"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor conectado en el puerto, ${this.port}`);
    });
  }
}
module.exports = Server;