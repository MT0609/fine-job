import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { getAllMessages, getMessage } from "../../actions/messageActions";
import MessageList from "../../container/message/pageContainer/messageList";
import MessageDetail from "../../container/message/pageContainer/messageDetail";
import MessageDialog from "../../container/message/dialog";
import socket from "../../configs/socket";

function MessagePage() {
  const myInfo = useSelector((state) => state.auth.user);
  const messageState = useSelector((state) => state.message);
  const messages = messageState.messages;
  const message = messageState.message;
  const selectMessageID = useRef();

  const theme = useTheme();
  const messageDialogAllow = useMediaQuery(theme.breakpoints.down("sm"));
  const messageGridAllow = useMediaQuery(theme.breakpoints.up("sm"));

  const [messageDialogShow, setMessageDialogShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMessages());
    if (message.partnerID) selectMessageID.current = message.partnerID;
  }, [dispatch, message]);

  useEffect(() => {
    socket.on("server-res-1-1-msg", (partnerId) => {
      if (selectMessageID.current && partnerId !== selectMessageID.current)
        return;

      if (partnerId === selectMessageID.current)
        dispatch(getMessage(partnerId, 1));
    });
  }, []);

  const handleMessageClick = (partnerID) => {
    dispatch(getMessage(partnerID, 1));
    setMessageDialogShow(true);
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Message | Fine Job</title>
      </Helmet>

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
              <MessageDetail
                myInfo={myInfo}
                message={message}
                socket={socket}
              />
            </Grid>
          )}

          {messageDialogAllow && (
            <MessageDialog
              myInfo={myInfo}
              show={messageDialogShow && messageDialogAllow}
              message={message}
              socket={socket}
              close={() => setMessageDialogShow(false)}
            />
          )}
        </Grid>
      </Container>
    </>
  );
}

export default MessagePage;
