import React, { useState } from "react";
import { Avatar, Box, Divider, Typography } from "@material-ui/core";
import CircularLoading from "../../../components/loading/circular";
import styles from "./index.module.scss";

function MessageList(props) {
  const {
    isLoading = false,
    messages = [],
    onMessageClick,
    jobSelectHightLight = true,
  } = props;

  const [messageClick, setMessageClick] = useState("");

  const handleMessageClick = (partnerID) => {
    setMessageClick(partnerID);
    if (onMessageClick) onMessageClick(partnerID);
  };

  return (
    <div className={styles.messageList}>
      {/* infoBar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: "0.8rem 1rem", fontWeight: "bold" }}
      >
        <span>Messages</span>
      </Box>

      <Divider />

      {/* messages */}
      {!isLoading ? (
        messages?.length ? (
          <div className={styles.messageList__items}>
            {messages.map((message, index) => (
              <Box
                className={`${styles.messageList__item}${
                  messageClick === message.partnerID && jobSelectHightLight
                    ? ` ${styles["messageList__item--active"]}`
                    : ""
                }`}
                display="flex"
                key={index}
                onClick={() => handleMessageClick(message.partnerID)}
              >
                <Avatar
                  style={{
                    marginRight: "0.5rem",
                  }}
                  alt="Avatar"
                  src={
                    message.partnerBaseInfo.avatar ||
                    "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                  }
                ></Avatar>
                <Box flexGrow={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <p>
                        {message.partnerBaseInfo.firstName +
                          " " +
                          message.partnerBaseInfo.lastName}
                      </p>
                    </Box>
                    <Box>
                      <p>
                        {new Date(
                          message.latestMessage[0]?.time
                        ).toLocaleDateString()}
                      </p>
                    </Box>
                  </Box>

                  <div
                    style={{
                      width: "15rem",
                      color: "#5E5E5E",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {message.latestMessage[0]?.msg}
                  </div>
                </Box>
              </Box>
            ))}
          </div>
        ) : (
          <div className={styles.messageList__items}>
            <Typography variant="h6">No Messages</Typography>
          </div>
        )
      ) : (
        <div className={styles.messageList__items}>
          <CircularLoading />
        </div>
      )}
    </div>
  );
}

export default MessageList;
