const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const server = express();

require("dotenv").config();

server.use(cors());
server.use(express.json());

//para conectarte a la bd
async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "netflix",
  });
  connection.connect();
  return connection;
}

const port = 5001;
server.listen(port, () => {
  console.log(`Server is running. Go to http://localhost:${port}`);
});
