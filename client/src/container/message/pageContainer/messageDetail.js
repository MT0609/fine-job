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

function MessageDetail({ myInfo = {}, message }) {
  const dispatch = useDispatch();

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(message.partnerID, msg));
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
                avatar: `${message.avatar}`,
                name: `${message.partnerInfo?.lastName}`,
              }}
              messages={message.messages}
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
