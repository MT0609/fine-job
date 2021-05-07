import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { getAllMessages, getMessage } from "../../actions/messageActions";
import MessageList from "../../container/message/pageContainer/messageList";
import MessageDetail from "../../container/message/pageContainer/messageDetail";
import MessageDialog from "../../container/message/dialog";
import CircularLoading from "../../components/loading/circular";

function MessagePage() {
  const messageState = useSelector((state) => state.message);
  const messages = messageState.messages;
  const message = messageState.message;

  const theme = useTheme();
  const messageDialogAllow = useMediaQuery(theme.breakpoints.down("sm"));
  const messageGridAllow = useMediaQuery(theme.breakpoints.up("sm"));

  const [messageDialogShow, setMessageDialogShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch, message]);

  const handleMessageClick = (partnerID) => {
    dispatch(getMessage(partnerID, 1));
    setMessageDialogShow(true);
  };

  return (
    <Container
      style={{
        height: "70vh",
        padding: 0,
        backgroundColor: "white",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={6}
          style={{ height: "100%", borderRight: "2px solid #F4F4F4" }}
        >
          <MessageList
            messages={messages}
            onMessageClick={handleMessageClick}
            jobSelectHightLight={messageGridAllow}
          />
        </Grid>

        {messageGridAllow && (
          <Grid item md style={{ height: "100%" }}>
            {!messageState.isLoading ? (
              <MessageDetail message={message} />
            ) : (
              <CircularLoading />
            )}
          </Grid>
        )}

        {messageDialogAllow && (
          <MessageDialog
            show={messageDialogShow && messageDialogAllow}
            message={message}
            close={() => setMessageDialogShow(false)}
          />
        )}
      </Grid>
    </Container>
  );
}

export default MessagePage;
