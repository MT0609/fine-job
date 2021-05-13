import React, { useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

export default function Input({ sendMessage }) {
  const [input, setInput] = useState("");

  const send = () => {
    if (!input) return;
    setInput("");
    if (sendMessage) sendMessage(input);
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Grid item xs={10}>
        <TextField
          fullWidth
          InputProps={{
            style: {
              height: "100%",
              paddingLeft: "0.5rem",
            },
            disableUnderline: true,
          }}
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
        />
      </Grid>
      <Grid item>
        <IconButton style={{ padding: "0.5rem" }} onClick={send}>
          <Send color={input && "primary"} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
