import React from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExitToApp, AccountBox } from "@material-ui/icons";
import { signOut } from "./../../actions/authActions";
import { ROUTES } from "../../constants/routes";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
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
  const { anchorEl, open, onclose } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onSignOutClick = () => {
    dispatch(signOut());
    window.open(ROUTES.jobs, "_self");
  };

  return (
    <StyledMenu
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <MenuItem>
        <ListItemIcon>
          <AccountBox fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </MenuItem>
      <MenuItem onClick={onSignOutClick}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </MenuItem>
    </StyledMenu>
  );
}

export default UserSubMenu;
