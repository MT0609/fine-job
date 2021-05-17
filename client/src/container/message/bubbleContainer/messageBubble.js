import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../../components/message/input";
import InfoBar from "../../../components/message/infoBar";
import InboxMessages from "../../../components/message/inboxMessages";
import {
  sendMessage,
  deleteMessage,
  deleteConversation,
} from "../../../actions/messageActions";
import styles from "./index.module.scss";

function MessageBubble({ message, onClose }) {
  const [largeBubble, setLargeBubble] = useState(true);

  const dispatch = useDispatch();

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(message.userID_2, msg));
  };

  const handleDeleteMessage = (msgID) => {
    dispatch(deleteMessage(message.userID_2, msgID));
  };

  const handleCloseMessage = () => {
    if (onClose) onClose(message?.id);
  };

  const handleDeleteConversation = () => {
    dispatch(deleteConversation(message.userID_2));
  };

  return (
    <div
      className={`${
        largeBubble ? `${styles["bubble"]}` : `${styles["bubble--minimize"]}`
      } `}
    >
      <InfoBar
        receipt={{ name: "receiver" }}
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
          messages={message?.messages}
          ondelete={handleDeleteMessage}
        />
        <Input sendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default MessageBubble;
