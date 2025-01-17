import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Divider, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import CircularLoading from "../../../components/loading/circular";
import styles from "./index.module.scss";

function MessageList({ isLoading = false, messages = [], onMessageClick }) {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);

  const [messageListEnlarge, SetMessageListEnlarge] = useState(false);

  const handleMessageClick = (partnerID) => {
    if (onMessageClick) onMessageClick(partnerID);
  };

  const setMessageListView = () => {
    SetMessageListEnlarge((prevState) => !prevState);
  };

  return (
    <div
      className={`${styles.messageList} ${
        !messageListEnlarge ? `${styles["messageList--minimize"]}` : ""
      }`}
    >
      {/* infoBar */}
      <Box
        display="flex"
        alignItems="center"
        style={{
          padding: "0.5rem 1rem",
          textAlign: "left",
          cursor: "pointer",
        }}
        onClick={setMessageListView}
      >
        <Avatar
          style={{
            marginRight: "0.5rem",
          }}
          alt="Avatar"
          src={
            auth.user?.avatar ||
            "https://res.cloudinary.com/dghvjalhh/image/upload/v1610614321/avatars/dwmh6cncmhlzy6jtlskm.png"
          }
        ></Avatar>
        <Box>
          <p style={{ fontWeight: "bold" }}>
            {auth.user?.baseInfo?.firstName} {auth.user?.baseInfo?.lastName}
          </p>
          <p>{t("message.messages")}</p>
        </Box>
      </Box>

      <Divider />

      {/* messages */}
      {!isLoading ? (
        messages?.length ? (
          <div className={styles.messageList__items}>
            {messages.map((message, index) => (
              <Box
                className={styles.messageList__item}
                display="flex"
                key={index}
                style={{
                  padding: "0.5rem",
                  textAlign: "left",
                  borderBottom: "2px solid #EBEBEB",
                  cursor: "pointer",
                }}
                onClick={() => handleMessageClick(message.partnerID)}
              >
                <Avatar
                  style={{
                    marginRight: "0.5rem",
                  }}
                  alt="Avatar"
                  src={
                    message.partnerBaseInfo.avatar ||
                    "https://res.cloudinary.com/dghvjalhh/image/upload/v1638072745/avatars/user_xscsme.png"
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
                        {t("message.date", {
                          date: new Date(message.latestMessage[0]?.time),
                        })}
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
