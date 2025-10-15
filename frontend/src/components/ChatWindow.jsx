// frontend/src/components/ChatWindow.jsx
import React from "react";

const ChatWindow = ({ mensajes, darkMode, usuario }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "10px",
        overflowY: "auto",
        backgroundColor: darkMode ? "#0d0d0d" : "#f5f5f5",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      {mensajes.map((msg, i) => {
        const isMine = msg.user === usuario;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: isMine ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px",
                borderRadius: "12px",
                backgroundColor: darkMode
                  ? isMine
                    ? "#FFD700" // Amarillo para mis mensajes
                    : "#2a2a2a" // Gris oscuro para otros
                  : isMine
                  ? "#007bff" // Azul en modo claro
                  : "#e0e0e0", // Gris claro en modo claro
                color: isMine
                  ? darkMode
                    ? "#000" // texto negro sobre amarillo
                    : "#fff" // texto blanco sobre azul
                  : "#fff", // texto blanco sobre gris oscuro
              }}
            >
              {!isMine && (
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  {msg.user}
                </div>
              )}
              <div>{msg.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
