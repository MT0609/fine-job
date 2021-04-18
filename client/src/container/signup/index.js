import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  TextField,
  FormGroup,
  Container,
  Box,
  Grid,
} from "@material-ui/core";
import { SignUpSchema } from "../../utils/validation";

import styles from "./signUp.module.scss";

function SignUp() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data) => console.log(data, errors);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" variant="outlined" color="primary">
            Sign Up
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default SignUp;
