import React from "react";

const Message = ({ user, text }) => {
  return (
    <div style={styles.msg}>
      <strong>{user}: </strong> {text}
    </div>
  );
};

const styles = {
  msg: {
    margin: "5px 0",
    padding: "5px",
    borderRadius: "5px",
    backgroundColor: "#eee"
  }
};

export default Message;
