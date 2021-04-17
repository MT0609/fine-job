import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { TextField, Button, Box, Grid } from "@material-ui/core";
import styles from "./styles.module.scss";

function ForgotRecovery(props) {
  const { onsubmit, back } = props;

  const handleBack = () => {
    if (back) back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, token } = e.target;
    if (onsubmit)
      onsubmit({
        newPassword: password.value,
        passwordResetToken: token.value,
      });
  };

  return (
    <div className={styles.resetPassword}>
      <form onSubmit={handleSubmit}>
        <Box className={styles.resetPassword__inputs}>
          <TextField name="password" label="Your New Password" fullWidth />
          <TextField
            style={{ marginTop: "1rem" }}
            name="token"
            label="Reset Token"
            fullWidth
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item>
            <Button onClick={handleBack} variant="contained" color="primary">
              <ArrowBackIcon />
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ForgotRecovery;
