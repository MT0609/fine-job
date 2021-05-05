import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../../components/message/input";
import InfoBar from "../../../components/message/infoBar";
import InboxMessages from "../../../components/message/inboxMessages";
import {
  getMessage,
  sendMessage,
  deleteMessage,
} from "../../../actions/messageActions";
import styles from "./index.module.scss";

function MessageBubble() {
  const messageState = useSelector((state) => state.message);
  const message = messageState?.message;
  const dispatch = useDispatch();

  const [largeBubble, setLargeBubble] = useState(true);

  useEffect(() => {
    dispatch(getMessage("607d5b37d9300e01e8a39c44"));
  }, [dispatch]);

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(msg, "607d5b37d9300e01e8a39c44"));
  };

  const handleDeleteMessage = (msgID) => {
    dispatch(deleteMessage(msgID, "607d5b37d9300e01e8a39c44"));
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
