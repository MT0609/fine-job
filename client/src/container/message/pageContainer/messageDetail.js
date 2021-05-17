import React from "react";
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

function MessageDetail({ message }) {
  const dispatch = useDispatch();

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(message.userID_2, msg, 1));
  };

  const handleDeleteMessage = (msgID) => {
    dispatch(deleteMessage(message.userID_2, msgID, 1));
  };

  const handleDeleteConversation = () => {
    dispatch(deleteConversation(message.userID_2));
  };

  return (
    <div className={styles.message}>
      {message && message.id && (
        <>
          <InfoBar
            receive={{ name: "receiver" }}
            onDeleteConversation={handleDeleteConversation}
          />

          <div className={styles.message__main}>
            <InboxMessages
              messages={message?.messages}
              ondelete={handleDeleteMessage}
            />
          </div>

          <Input sendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
}

export default MessageDetail;
