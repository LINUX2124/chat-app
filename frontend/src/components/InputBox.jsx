// frontend/src/components/InputBox.jsx
import React, { useState } from "react";

const InputBox = ({ onSend, darkMode }) => {
  const [texto, setTexto] = useState("");

  const handleSend = () => {
    if (texto.trim() !== "") {
      onSend(texto);
      setTexto("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginRight: "6px",
          backgroundColor: darkMode ? "#1a1a1a" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "10px 16px",
          border: "none",
          borderRadius: "20px",
          backgroundColor: darkMode ? "#FFD700" : "#007bff",
          color: darkMode ? "#000" : "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ➤
      </button>
    </div>
  );
};

export default InputBox;
