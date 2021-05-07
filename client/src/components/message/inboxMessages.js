import React, { useEffect, useRef } from "react";
import { Box, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import styles from "./index.module.scss";

function InboxMessages(props) {
  const { messages = [], ondelete } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages.length]);

  const deleteMessage = (id) => {
    if (ondelete) ondelete(id);
  };

  return (
    <div className={styles.messages}>
      {messages.map((message, index) => {
        if (message.status === "sent")
          return (
            <div key={index} className={styles.message}>
              <Box
                className={styles.message__text}
                style={{
                  margin: "0.5rem",
                  marginRight: "1rem",
                  textAlign: "left",
                }}
              >
                <p className={styles.messages__time}>
                  {new Date(message.time).toLocaleString()}
                </p>
                <p>{message.msg}</p>
              </Box>
              <div className={styles.message__delete}>
                <IconButton
                  style={{ padding: "0.5rem" }}
                  onClick={() => deleteMessage(message._id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </div>
          );
        return "";
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default InboxMessages;
