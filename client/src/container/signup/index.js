import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  TextField,
  FormGroup,
  Container,
  Box,
  Grid,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { SignUpSchema } from "../../utils/validation";
import { signUp } from "../../actions/authActions";
import * as AUTHCONSTANTS from "../../constants/authConstants";

import styles from "./signUp.module.scss";

function SignUp() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    delete data.retypePassword;
    dispatch(signUp(data));
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        {auth.error === AUTHCONSTANTS.USER_REGISTER_FAIL && (
          <Typography
            style={{ textAlign: "left", color: "red", fontStyle: "italic" }}
          >
            * Email has been used!
          </Typography>
        )}

        {auth.signUpStatus === AUTHCONSTANTS.USER_REGISTER_SUCCESS && (
          <Typography
            style={{ textAlign: "left", color: "green", fontStyle: "italic" }}
          >
            &#10004; Sign Up Successfully
          </Typography>
        )}

        <FormGroup row>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                label="First Name"
                name="firstName"
                fullWidth
                inputRef={register}
                autoFocus
              />
              <Box className={styles.error}>
                {errors.firstName && <span>* {errors.firstName.message}</span>}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Last Name"
                name="lastName"
                fullWidth
                inputRef={register}
                autoFocus
              />
              <Box className={styles.error}>
                {errors.lastName && <span>* {errors.lastName.message}</span>}
              </Box>
            </Grid>
          </Grid>
        </FormGroup>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          autoComplete="email"
          inputRef={register}
        />
        <Box className={styles.error}>
          {errors.email && <span>* {errors.email.message}</span>}
        </Box>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Username"
          name="username"
          inputRef={register}
        />
        <Box className={styles.error}>
          {errors.username && <span>* {errors.username.message}</span>}
        </Box>

        <FormGroup row>
          <Grid container alignItems="flex-end" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Birthday"
                name="dob"
                type="date"
                defaultValue="2000-05-24"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="signup_gender">Gender</InputLabel>
                <Select
                  id="signup_gender"
                  native
                  name="sex"
                  defaultValue="male"
                  inputRef={register}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          inputRef={register}
        />
        <Box className={styles.error}>
          {errors.password && <span>* {errors.password.message}</span>}
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="retypePassword"
          label="Retype Password"
          type="password"
          inputRef={register}
        />
        <Box className={styles.error}>
          {errors.retypePassword && (
            <span>* {errors.retypePassword.message}</span>
          )}
        </Box>
        <div className={styles.submitButton}>
          <LoadingButton
            type="submit"
            onClick={handleSubmit}
            pending={auth.isLoading}
            variant="outlined"
          >
            Sign Up
          </LoadingButton>
        </div>
      </form>
    </Container>
  );
}

export default SignUp;
