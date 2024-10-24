const Server = require("./Model/server");

const server = new Server();

server.listen();

require("dotenv").config();
