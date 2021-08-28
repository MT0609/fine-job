import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/message/input";
import InfoBar from "../../../components/message/infoBar";
import InboxMessages from "../../../components/message/inboxMessages";
import {
  sendMessage,
  deleteMessage,
  deleteConversation,
} from "../../../actions/messageActions";
import socket from "../../../configs/socket";
import styles from "./index.module.scss";

function MessageBubble({ myInfo = {}, message, onClose }) {
  const [largeBubble, setLargeBubble] = useState(true);
  const [partnerTyping, setPartnerTyping] = useState({
    partnerID: "",
    typing: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("server-res-typingMessage", (partnerID) => {
      setPartnerTyping({
        partnerID,
        typing: true,
      });
    });
    socket.on("server-res-stopTypingMessage", (partnerID) => {
      setPartnerTyping({
        partnerID,
        typing: false,
      });
    });
  }, []);

  const typing = useRef(false);
  const timeout = useRef();

  const typingTimeout = () => {
    typing.current = false;
    socket.emit("stopTypingMessage", { receiver: message.partnerID });
  };

  const onType = () => {
    if (typing.current === false) {
      typing.current = true;
      socket.emit("typingMessage", { receiver: message.partnerID });
      timeout.current = setTimeout(typingTimeout, 2000);
    } else {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(typingTimeout, 2000);
    }
  };

  const handleSendMessage = (msg) => {
    if (msg.trim() === "") return;
    dispatch(sendMessage(message.partnerID, msg));

    try {
      clearTimeout(timeout.current);
      socket.emit("stopTypingMessage", { receiver: message.partnerID });

      const tmo = setTimeout(() => {
        socket?.emit("new-1-1-msg", { receiver: message.partnerID, data: msg });
        clearTimeout(tmo);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMessage = (msgID) => {
    dispatch(deleteMessage(message.partnerID, msgID));
  };

  const handleCloseMessage = () => {
    if (onClose) onClose(message.partnerID);
  };

  const handleDeleteConversation = () => {
    dispatch(deleteConversation(message.partnerID));
  };

  return (
    <>
      {message && message.partnerID && (
        <div
          className={`${
            largeBubble
              ? `${styles["bubble"]}`
              : `${styles["bubble--minimize"]}`
          } `}
        >
          <InfoBar
            receiver={{
              avatar: `${message.avatar}`,
              name: `${message.partnerInfo?.lastName}`,
              id: `${message.partnerID}`,
            }}
            enlargeBubble={() => setLargeBubble((prevState) => !prevState)}
            onCloseMessage={handleCloseMessage}
            onDeleteConversation={handleDeleteConversation}
          />
          <div
            className={
              largeBubble
                ? `${styles["bubble__message--maximize"]}`
                : `${styles["bubble__message--minimize"]}`
            }
          >
            <InboxMessages
              myInfo={{
                avatar: myInfo?.avatar,
                name: myInfo.baseInfo?.lastName,
              }}
              receiver={{
                id: message.partnerID,
                avatar: `${message.avatar}`,
                name: `${message.partnerInfo?.lastName}`,
              }}
              messages={message?.messages}
              partnerTyping={partnerTyping}
              ondelete={handleDeleteMessage}
            />

            <Input onTyping={onType} sendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </>
  );
}

export default MessageBubble;
