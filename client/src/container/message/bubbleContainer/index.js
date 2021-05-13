import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageBubble from "./messageBubble";
import MessageList from "./messageList";
import {
  getMessage,
  getAllMessages,
  closeActiveBubbleMessage,
} from "../../../actions/messageActions";
import styles from "./index.module.scss";

function MessageBubbleContainer() {
  const messageState = useSelector((state) => state.message);
  const activeBubbleMessages = messageState?.activeBubbleMessages;

  const dispatch = useDispatch();

  const handleGetMessage = (partnerID) => {
    dispatch(getMessage(partnerID));
  };

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch, activeBubbleMessages]);

  const onCloseActiveBubbleMessage = (msgID) => {
    dispatch(closeActiveBubbleMessage(msgID));
  };

  return (
    <div className={styles.messageListContainer}>
      {/* <MessageBubble message={message} />
      <MessageBubble message={message} /> */}
      {activeBubbleMessages?.length
        ? activeBubbleMessages.map((activeMessage) => (
            <MessageBubble
              message={activeMessage}
              onClose={onCloseActiveBubbleMessage}
            />
          ))
        : ""}

      <MessageList
        isLoading={messageState.isMessagesLoading}
        messages={messageState.messages}
        onMessageClick={handleGetMessage}
      />
    </div>
  );
}

export default MessageBubbleContainer;
