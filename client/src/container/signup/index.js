import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();
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
            * {t("authPage.emailUsed")}
          </Typography>
        )}

        {auth.signUpStatus === AUTHCONSTANTS.USER_REGISTER_SUCCESS && (
          <Typography
            style={{ textAlign: "left", color: "green", fontStyle: "italic" }}
          >
            &#10004; {t("authPage.signUpSuccess")}
          </Typography>
        )}

        <FormGroup row>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                margin="normal"
                label={t("people.firstName")}
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
                label={t("people.lastName")}
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
          label={t("people.email")}
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
          label={t("authPage.username")}
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
                label={t("people.birthday")}
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
                <InputLabel htmlFor="signup_gender">
                  {t("people.gender")}
                </InputLabel>
                <Select
                  id="signup_gender"
                  native
                  name="sex"
                  defaultValue="male"
                  inputRef={register}
                >
                  <option value="male">{t("people.male")}</option>
                  <option value="female">{t("people.female")}</option>
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
          label={t("authPage.password")}
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
          label={t("authPage.passwordRetype")}
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
            {t("authPage.register")}
          </LoadingButton>
        </div>
      </form>
    </Container>
  );
}

export default SignUp;
