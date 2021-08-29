import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/message/page/input";
import InfoBar from "../../../components/message/page/infoBar";
import InboxMessages from "../../../components/message/page/inboxMessages";
import {
  sendMessage,
  deleteMessage,
  deleteConversation,
} from "../../../actions/messageActions";
import styles from "./index.module.scss";

function MessageDetail({ myInfo = {}, message, socket }) {
  const dispatch = useDispatch();

  const [partnerTyping, setPartnerTyping] = useState({
    partnerID: "",
    typing: false,
  });

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

    clearTimeout(timeout.current);
    socket.emit("stopTypingMessage", { receiver: message.partnerID });

    try {
      const tmo = setTimeout(() => {
        socket?.emit("new-1-1-msg", { receiver: message.partnerID, data: msg });
        clearTimeout(tmo);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMessage = (msgID) => {
    dispatch(deleteMessage(message.partnerID, msgID, 1));
  };

  const handleDeleteConversation = () => {
    dispatch(deleteConversation(message.partnerID));
  };

  return (
    <div className={styles.message}>
      {message && message.partnerID && (
        <>
          <InfoBar
            receiver={{
              name: `${message.partnerInfo?.firstName} ${message.partnerInfo?.lastName}`,
              id: `${message.partnerID}`,
            }}
            onDeleteConversation={handleDeleteConversation}
          />

          <div className={styles.message__main}>
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
              messages={message.messages}
              partnerTyping={partnerTyping}
              ondelete={handleDeleteMessage}
            />
          </div>

          <Input onTyping={onType} sendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
}

export default MessageDetail;
