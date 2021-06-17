import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExitToApp, AccountBox, PostAdd, Work } from "@material-ui/icons";
import { signOut } from "./../../actions/authActions";

const StyledMenu = withStyles({
  paper: {
    padding: "0rem 1rem",
    borderRadius: "5px",
    border: "1px solid #d3d4d5",
    boxShadow: "-5px 5px 5px rgba(0, 0, 0, 0.034)",
    "& .MuiListItem-root": {},
    "& .MuiListItemIcon-root": {
      minWidth: "fit-content",
      marginRight: "1rem",
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

function UserSubMenu(props) {
  const { user, anchorEl, open, onclose } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSignOutClick = () => {
    handleClose();
    dispatch(signOut());
  };

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Typography
          style={{
            fontWeight: "bold",
            pointerEvents: "none",
            marginLeft: "1rem",
          }}
        >
          {user?.baseInfo?.firstName} {user?.baseInfo?.lastName}
        </Typography>
        <Link to={`/profile/${user.id}`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBox fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("header.userMenu.profile")} />
          </MenuItem>
        </Link>
        <Link to={`/talent`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon
              style={{ minWidth: "fit-content", marginRight: "1rem" }}
            >
              <PostAdd fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("header.userMenu.talent")} />
          </MenuItem>
        </Link>
        <Link to={`/jobs/my-jobs`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon
              style={{ minWidth: "fit-content", marginRight: "1rem" }}
            >
              <Work fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("header.userMenu.job")} />
          </MenuItem>
        </Link>
        <MenuItem onClick={onSignOutClick}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("header.userMenu.signOut")} />
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default UserSubMenu;
