// backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Configurar CORS para permitir frontend (React en localhost:3000)
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend
    methods: ["GET", "POST"]
  }
});

// Importamos la lógica del chat
require("./sockets/chatSocket.js")(io);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
