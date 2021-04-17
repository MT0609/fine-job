import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import EmailSubmit from "./emailSubmit/emailSubmit";
import ResetPassword from "./resetPassword/resetPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "red",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgb(0 0 0 / 15%)",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function ForgotSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getSteps() {
    return ["Submit Email for Reset Password", "Reset Password"];
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleEmailSubmit = async (email) => {
    console.log(email);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePasswordReset = async ({ newPassword, passwordResetToken }) => {};

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <EmailSubmit onsubmit={handleEmailSubmit} />;
      case 1:
        return (
          <ResetPassword back={handleBack} onsubmit={handlePasswordReset} />
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <Container maxWidth="sm">
      <Box className={classes.root}>
        <Typography
          variant="h5"
          style={{
            color: "black",
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "1rem",
          }}
        >
          Reset Password
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel style={{ textAlign: "left" }}>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Account Verified. Login Again</Typography>
            <Button onClick={handleReset} variant="contained" color="primary">
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
