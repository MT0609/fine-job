import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert, Delete } from "@material-ui/icons";

function InfoBar(props) {
  const { receiver, onDeleteConversation } = props;

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
        height: "100%",
        padding: "0 1rem",
        borderBottom: "1px solid #E5E5E5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <section>
        <Link
          to={`/profile/${receiver.id}`}
          style={{
            color: "#000000",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          {receiver.name}
        </Link>
      </section>

      <section>
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
      </section>
    </div>
  );
}

export default InfoBar;
