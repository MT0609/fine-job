import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert, Close, Delete } from "@material-ui/icons";

function InfoBar(props) {
  const {
    receive,
    enlargeBubble,
    onCloseMessage,
    onDeleteConversation,
  } = props;

  const onMsgBarClick = () => {
    if (enlargeBubble) enlargeBubble();
  };

  const onCloseButtonClick = () => {
    if (onCloseMessage) onCloseMessage();
  };

  const onDeleteConversationClick = () => {
    if (onDeleteConversation) onDeleteConversation();
  };

  const [moreOption, setMoreOption] = React.useState(null);
  const moreOptionOpen = Boolean(moreOption);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "5px 10px",
        borderBottom: "2px solid #E5E5E5",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={onMsgBarClick}
      ></div>

      <section
        style={{
          width: "fit-content",
          marginRight: "auto",
        }}
      >
        {receive.name}
      </section>

      <section
        style={{
          width: "fit-content",
          marginLeft: "auto",
        }}
      >
        <IconButton
          style={{ padding: "0.4rem" }}
          onClick={(e) => setMoreOption(e.currentTarget)}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={moreOption}
          keepMounted
          open={moreOptionOpen}
          onClose={() => setMoreOption(null)}
        >
          <MenuItem
            style={{ padding: "0.5rem", fontWeight: "bold" }}
            onClick={onDeleteConversationClick}
          >
            <Delete style={{ marginRight: "0.5rem", color: "red" }} />
            Delete Conversation
          </MenuItem>
        </Menu>
        <IconButton style={{ padding: "0.4rem" }} onClick={onCloseButtonClick}>
          <Close />
        </IconButton>
      </section>
    </div>
  );
}

export default InfoBar;
