import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@material-ui/core";
import { ExitToApp, AccountBox } from "@material-ui/icons";

function UserSubMenu(props) {
  const { anchorEl, open, onclose } = props;

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

  const handleClose = () => {
    if (onclose) onclose();
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
      <Link href="/">
        <MenuItem>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Link>
    </StyledMenu>
    // <div>
    //   <Paper variant="outlined">
    //     <p>Username</p>
    //     <hr></hr>
    //     <Button>Sign Out</Button>
    //   </Paper>
    // </div>
  );
}

export default UserSubMenu;
