import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import styles from "./styles.module.scss";

function ForgotPassword(props) {
  const { onsubmit } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = e.target;
    if (onsubmit) onsubmit(email.value);
  };

  return (
    <div className={styles.emailSubmit}>
      <form onSubmit={handleSubmit}>
        <div className={styles.emailSubmit__input}>
          <TextField name="email" type="email" label="Your Email" fullWidth />
        </div>
        <Button type="submit" variant="contained" color="primary">
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
