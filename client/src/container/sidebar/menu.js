import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Divider, Drawer } from "@material-ui/core";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import {
  AccountCircle,
  PeopleAlt,
  Work,
  Chat,
  Close,
  ExitToApp,
} from "@material-ui/icons";
import { signOut } from "./../../actions/authActions";

function SidebarMenu(props) {
  const { show = false, onclose, auth } = props;
  const dispatch = useDispatch();

  const onSidebarClose = () => {
    if (onclose) onclose();
  };

  const onSignOutClick = () => {
    onSidebarClose();
    dispatch(signOut());
  };

  return (
    <Drawer anchor="right" open={show} onClose={onSidebarClose}>
      <div onClick={onSidebarClose} onKeyDown={onSidebarClose}>
        <IconButton style={{ padding: "0.5rem" }}>
          <Close />
        </IconButton>
        <Link to="/jobs" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="My Network" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/jobs" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/messages" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </Link>
        <Divider />
        {!auth.isAuth ? (
          <Link to="/authen" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button onClick={onSignOutClick}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Login/Register" />
            </ListItem>
          </Link>
        ) : (
          <>
            <Link
              to={`/profile/${auth?.user?.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
            </Link>
            <Divider />
            <ListItem button onClick={onSignOutClick}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        )}
        <Divider />
      </div>
    </Drawer>
  );
}

export default SidebarMenu;
