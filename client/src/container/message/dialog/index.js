import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, Slide } from "@material-ui/core";
import Input from "../../../components/message/dialog/input";
import InfoBar from "../../../components/message/dialog/infoBar";
import InboxMessages from "../../../components/message/dialog/inboxMessages";
import {
  sendMessage,
  deleteMessage,
  deleteConversation,
} from "../../../actions/messageActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog(props) {
  const { socket, myInfo = {}, message = {}, show = false, close } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    if (close) close();
  };

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
    handleClose();
  };

  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent style={{ padding: 5 }}>
        {message && (
          <>
            <InfoBar
              receiver={{
                avatar: `${message.avatar}`,
                name: `${message.partnerInfo?.lastName}`,
                id: `${message.partnerID}`,
              }}
              onDeleteConversation={handleDeleteConversation}
              onCloseMessage={handleClose}
            />
            <InboxMessages
              myInfo={{
                avatar: myInfo?.avatar,
                name: myInfo?.baseInfo?.lastName,
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
