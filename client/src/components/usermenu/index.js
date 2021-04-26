import React from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExitToApp, AccountBox } from "@material-ui/icons";
import { signOut } from "./../../actions/authActions";
import { ROUTES } from "../../constants/routes";

const StyledMenu = withStyles({
  paper: {
    padding: "0rem 1rem",
    borderRadius: "5px",
    border: "1px solid #d3d4d5",
    boxShadow: "-5px 5px 5px rgba(0, 0, 0, 0.034)",
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

  const dispatch = useDispatch();

  const handleClose = () => {
    if (onclose) onclose();
  };

  const onTalentClick = () => {
    window.open(ROUTES.talent, "_self");
  };

  const onSignOutClick = () => {
    dispatch(signOut());
    window.open(ROUTES.jobs, "_self");
  };

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Typography style={{ fontWeight: "bold" }}>
          {user?.baseInfo?.firstName} {user?.baseInfo?.lastName}
        </Typography>
        <MenuItem>
          <ListItemIcon>
            <AccountBox fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={onTalentClick}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Manage Posting Job" />
        </MenuItem>
        <MenuItem onClick={onSignOutClick}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default UserSubMenu;
