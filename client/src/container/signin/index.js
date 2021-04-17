import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Link, Container, Box } from "@material-ui/core";
import { SignInSchema } from "../../utils/validation";
import { ROUTES } from "../../constants/routes";
import styles from "./signIn.module.scss";

function SignIn() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Your Email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          inputRef={register}
        />
        <Box className={styles.error}>
          {errors.email && <span>* {errors.email.message}</span>}
        </Box>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Your Password"
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
          <Button type="submit" variant="outlined" color="primary">
            Log In
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default SignIn;
