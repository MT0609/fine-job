import React from "react";
import { Avatar, Link, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert, Close, Delete } from "@material-ui/icons";
import styles from "./index.module.scss";

function InfoBar(props) {
  const { receiver, enlargeBubble, onCloseMessage, onDeleteConversation } =
    props;

  const onMsgBarClick = () => {
    if (enlargeBubble) enlargeBubble();
  };

  const onCloseButtonClick = () => {
    if (onCloseMessage) onCloseMessage();
  };

  const onDeleteConversationClick = () => {
    setMoreOption(null);
    if (onDeleteConversation) onDeleteConversation();
  };

  const [moreOption, setMoreOption] = React.useState(null);
  const moreOptionOpen = Boolean(moreOption);

  return (
    <div className={styles.infobar}>
      <div
        className={styles.infobar__bottomlayer}
        onClick={onMsgBarClick}
      ></div>

      <section className={styles.infobar__left}>
        <Avatar
          alt="Travis Howard"
          src={
            receiver.avatar ||
            "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
          }
          style={{ marginRight: "0.5rem" }}
        />
        <Link href={`/profile/${receiver.id}`}>{receiver.name}</Link>
      </section>

      <section className={styles.infobar__right}>
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
