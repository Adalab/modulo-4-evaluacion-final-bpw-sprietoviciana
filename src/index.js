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
  const id = parseInt(req.params.id);
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

server.post("/clients", async (req, res) => {
  const { name, lastname, email } = req.body;
  if (!name) {
    res.status(400).json({ message: "`name` is required" });
  } else if (!lastname) {
    res.status(400).json({ message: "`lastname` is required" });
  } else if (!email) {
    res.status(400).json({ message: "`email` is required" });
  } else {
    const connection = await getDBConnection();
    const query = "INSERT INTO clients(name, lastname, email) VALUES (?, ?, ?)";
    const [result] = await connection.query(query, [name, lastname, email]);
    connection.end();
    res.status(201).json({
      id: result.insertId,
      name,
      lastname,
      email,
    });
  }
});

server.put("/clients/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, lastname, email } = req.body;
  if (!name) {
    res.status(400).json({ message: "`name` is required" });
  } else if (!lastname) {
    res.status(400).json({ message: "`lastname` is required" });
  } else if (!email) {
    res.status(400).json({ message: "`email` is required" });
  } else {
    // TODO: comprobar que el cliente existe
    const connection = await getDBConnection();
    const query =
      "UPDATE clients SET name = ?, lastname = ?, email = ? WHERE id = ?";
    await connection.query(query, [name, lastname, email, id]);
    connection.end();
    res.status(200).json({ id, name, lastname, email });
  }
});


server.delete("/clients/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const connection = await getDBConnection();
  const query = "DELETE FROM clients WHERE id = ?";
  await connection.query(query, [id]);
  connection.end();
  res.status(204).send();
});
