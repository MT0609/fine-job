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

function MessageBubble({ myInfo = {}, message, onClose, socket }) {
  const [largeBubble, setLargeBubble] = useState(true);

  const dispatch = useDispatch();

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(message.partnerID, msg));

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
                avatar: `${message.avatar}`,
                name: `${message.partnerInfo?.lastName}`,
              }}
              messages={message?.messages}
              ondelete={handleDeleteMessage}
            />
            <Input sendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </>
  );
}

export default MessageBubble;
