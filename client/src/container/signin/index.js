import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, TextField, Link, Container, Box } from "@material-ui/core";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { signIn } from "../../actions/authActions";
import { SignInSchema } from "../../utils/validation";
import { ROUTES } from "../../constants/routes";
import * as USERCONSTANTS from "../../constants/userConstants";

import styles from "./signIn.module.scss";

function SignIn() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.isAuth) {
      // history.push(ROUTES.jobs);
      window.open(ROUTES.jobs, "_self");
    }
  }, [auth.isAuth, history]);

  const onSubmit = (data) => {
    dispatch(signIn(data));
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        {auth.error === USERCONSTANTS.USER_LOGIN_FAIL && (
          <Typography
            style={{ textAlign: "left", color: "red", fontStyle: "italic" }}
          >
            * Username or Password Not Correct
          </Typography>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Username"
          name="username"
          autoFocus
          inputRef={register}
        />
        <Box className={styles.error}>
          {errors.username && <span>* {errors.username.message}</span>}
        </Box>

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

        <Box style={{ textAlign: "right" }}>
          <Link href={ROUTES.forgot} variant="body2">
            Forgot Password
          </Link>
        </Box>

        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <div className={styles.submitButton}>
          {/* <Button
            pending
            type="submit"
            variant="outlined"
            color="primary"
            startIcon={!auth.isLoading ? <Save /> : ""}
          >
            Log In
          </Button> */}
          <LoadingButton
            type="submit"
            onClick={handleSubmit}
            pending={auth.isLoading}
            variant="outlined"
          >
            Log In
          </LoadingButton>
        </div>
      </form>
    </Container>
  );
}

export default SignIn;
