// backend/sockets/chatSocket.js

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Nuevo usuario conectado:", socket.id);

    // Cuando un usuario envía un mensaje
    socket.on("chat:message", (data) => {
      console.log("📩 Mensaje recibido:", data);
      // Enviar el mensaje a todos los clientes conectados
      io.emit("chat:message", data);
    });

    // Cuando un usuario se desconecta
    socket.on("disconnect", () => {
      console.log("🔴 Usuario desconectado:", socket.id);
    });
  });
};
