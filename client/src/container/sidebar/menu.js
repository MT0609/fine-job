import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
  Business,
  Close,
  ExitToApp,
} from "@material-ui/icons";
import { signOut } from "./../../actions/authActions";

function SidebarMenu(props) {
  const { show = false, onclose, auth } = props;

  const { t } = useTranslation();
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
            <ListItemText primary={t("header.network")} />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/jobs/my-jobs"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button>
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary={t("header.userMenu.job")} />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/messages" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary={t("header.message")} />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/company/mine"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem button>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary={t("company.myCompanies")} />
          </ListItem>
        </Link>
        <Divider />
        {!auth.isAuth ? (
          <Link to="/authen" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button onClick={onSignOutClick}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={t("header.auth")} />
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
                <ListItemText primary={t("header.userMenu.profile")} />
              </ListItem>
            </Link>
            <Divider />
            <ListItem button onClick={onSignOutClick}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={t("header.userMenu.signOut")} />
            </ListItem>
          </>
        )}
        <Divider />
      </div>
    </Drawer>
  );
}

export default SidebarMenu;
