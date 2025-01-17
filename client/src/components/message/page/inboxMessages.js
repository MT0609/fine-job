import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Box, Avatar, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import styles from "./index.module.scss";

function InboxMessages(props) {
  const {
    myInfo,
    receiver,
    messages = [],
    partnerTyping = {},
    ondelete,
  } = props;

  const auth = useSelector((state) => state.auth);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages.length]);

  const deleteMessage = (id) => {
    if (ondelete) ondelete(id);
  };

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messages}>
        {messages.map((message, index) => {
          if (message.status === "sent")
            return (
              <div key={index} className={styles.message}>
                <Box
                  className={`${styles.message__item} ${
                    auth?.user?.id !== message?.senderID &&
                    styles["message__item--left"]
                  }`}
                >
                  <Box display="flex">
                    {auth?.user?.id !== message?.senderID && (
                      <Avatar
                        alt={receiver.name}
                        src={
                          receiver.avatar ||
                          "https://res.cloudinary.com/dghvjalhh/image/upload/v1638072745/avatars/user_xscsme.png"
                        }
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    <div>
                      <p className={styles.messages__time}>
                        {new Date(message.time).toLocaleString()}
                      </p>
                      <p className={`${styles.message__text}`}>{message.msg}</p>
                    </div>

                    {auth?.user?.id === message?.senderID && (
                      <Avatar
                        alt={myInfo.name}
                        src={
                          myInfo.avatar ||
                          "https://res.cloudinary.com/dghvjalhh/image/upload/v1610614321/avatars/dwmh6cncmhlzy6jtlskm.png"
                        }
                        style={{ marginLeft: "10px" }}
                      />
                    )}
                  </Box>

                  {auth?.user?.id === message?.senderID && (
                    <div className={styles.message__delete}>
                      <IconButton
                        style={{ padding: "0.5rem" }}
                        onClick={() => deleteMessage(message._id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </Box>
              </div>
            );
          return "";
        })}
        <div ref={messagesEndRef} />
      </div>

      {partnerTyping.partnerID === receiver.id && partnerTyping.typing ? (
        <span className={styles.message__typing}>
          {receiver.name} is typing message...
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default InboxMessages;
