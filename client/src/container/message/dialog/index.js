import React from "react";
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
  const { message = null, show = false, close } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    if (close) close();
  };

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(message.userID_2, msg, 1));
  };

  const handleDeleteMessage = (msgID) => {
    dispatch(deleteMessage(message.userID_2, msgID, 1));
  };

  const handleDeleteConversation = () => {
    dispatch(deleteConversation(message.userID_2));
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
        {message && message.id && (
          <>
            <InfoBar
              receive={{ name: "receiver" }}
              onDeleteConversation={handleDeleteConversation}
              onCloseMessage={handleClose}
            />
            <InboxMessages
              messages={message?.messages}
              ondelete={handleDeleteMessage}
            />
            <Input sendMessage={handleSendMessage} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
