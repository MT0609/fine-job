import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import { Close } from "@material-ui/icons";

function InfoBar(props) {
  const { receipt, enlargeBubble } = props;

  const onMsgBarClick = () => {
    if (enlargeBubble) enlargeBubble();
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      style={{
        padding: "5px 10px",
        borderBottom: "2px solid #E5E5E5",
        cursor: "pointer",
      }}
      onClick={onMsgBarClick}
    >
      <Grid item>
        <span>{receipt.name}</span>
      </Grid>
      <Grid item>
        <IconButton style={{ padding: "0.4rem" }}>
          <Close />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default InfoBar;
