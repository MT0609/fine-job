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
  const { myInfo = {}, message = {}, show = false, close } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    if (close) close();
  };

  const handleSendMessage = (msg) => {
    dispatch(sendMessage(message.partnerID, msg));
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
