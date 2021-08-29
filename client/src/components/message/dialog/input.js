import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

export default function Input({ onTyping, sendMessage }) {
  const [input, setInput] = useState("");
  const { t } = useTranslation();

  const send = () => {
    if (!input) return;
    setInput("");
    if (sendMessage) sendMessage(input);
  };

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item xs={10}>
        <TextField
          fullWidth
          InputProps={{
            style: {
              padding: "0.5rem",
            },
            disableUnderline: true,
          }}
          value={input}
          placeholder={t("message.type")}
          onChange={(e) => {
            onTyping();
            setInput(e.target.value);
          }}
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
