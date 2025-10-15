// frontend/src/pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import socket from "../services/socket";

const ChatPage = () => {
  const [mensajes, setMensajes] = useState(() => {
    const guardados = localStorage.getItem("mensajes");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const nombre = localStorage.getItem("usuario");
    return nombre || "";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Pedir nombre si no está definido
  useEffect(() => {
    if (!usuario) {
      const nombre = prompt("Ingresa tu nombre o apodo:");
      setUsuario(nombre || "Invitado");
      localStorage.setItem("usuario", nombre || "Invitado");
    }
  }, [usuario]);

  // escuchar mensajes
  useEffect(() => {
    socket.on("chat:message", (msg) => {
      setMensajes((prev) => {
        const nuevos = [...prev, msg];
        localStorage.setItem("mensajes", JSON.stringify(nuevos));
        return nuevos;
      });
    });
    return () => socket.off("chat:message");
  }, []);

  const enviarMensaje = (texto) => {
    const nuevoMsg = { user: usuario, text: texto };
    socket.emit("chat:message", nuevoMsg);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const eliminarMensajes = () => {
    setMensajes([]);
    localStorage.removeItem("mensajes");
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: darkMode ? "#0d0d0d" : "#f9f9f9",
        color: darkMode ? "#f9f9f9" : "#1e1e1e",
      }}
    >
      <div style={styles.header}>
        <h1>💬 Chat en tiempo real</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={toggleDarkMode} style={styles.button}>
            {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
          <button onClick={eliminarMensajes} style={styles.deleteBtn}>
            🗑️ Borrar todo
          </button>
        </div>
      </div>
      <ChatWindow mensajes={mensajes} darkMode={darkMode} usuario={usuario} />
      <InputBox onSend={enviarMensaje} darkMode={darkMode} />
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  button: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ff4d4d",
    color: "white",
    fontWeight: "bold",
  },
};

export default ChatPage;
