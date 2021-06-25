import React from "react";
import i18next from "i18next";
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemText } from "@material-ui/core";

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

function LanguageSubMenu(props) {
  const { anchorEl, open, onclose } = props;

  const handleChangeLanguage = (lang) => {
    i18next.changeLanguage(lang);
    handleClose();
  };

  const handleClose = () => {
    if (onclose) onclose();
  };

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleChangeLanguage("en")}>
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem onClick={() => handleChangeLanguage("zh")}>
          <ListItemText primary="简体中文" />
        </MenuItem>
        <MenuItem onClick={() => handleChangeLanguage("vi")}>
          <ListItemText primary="Tiếng Việt" />
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default LanguageSubMenu;
