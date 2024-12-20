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
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: "vet",
  });
  connection.connect();
  return connection;
}

const port = 5001;
server.listen(port, () => {
  console.log(`Server is running. Go to http://localhost:${port}`);
});

server.get("/clients", async (req, res) => {
  const connection = await getDBConnection();
  const query = "SELECT id, name, lastname, email FROM clients";
  const [result] = await connection.query(query);
  connection.end();
  res.status(200).json({
    info: { count: result.length },
    result: result,
  });
});

server.get("/clients/:id", async (req, res) => {
  const id = req.params.id;
  const connection = await getDBConnection();
  const query = "SELECT id, name, lastname, email FROM clients WHERE id = ?";
  const [result] = await connection.query(query, [id]);
  connection.end();
  if (result.length !== 1) {
    res.status(404).json({});
  } else {
    res.status(200).json(result[0]);
  }
});
