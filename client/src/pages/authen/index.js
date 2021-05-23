import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppBar, Tabs, Tab, Paper, Container } from "@material-ui/core";
import SignIn from "../../container/signin";
import SignUp from "../../container/signup";

function Authen() {
  const [value, setValue] = useState(0);

  const auth = useSelector((state) => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm" style={{ paddingTop: "1rem" }}>
      <Paper>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: "#ffc400" } }}
          >
            <Tab label="Login" disabled={auth.isLoading} />
            <Tab label="Register" disabled={auth.isLoading} />
          </Tabs>
        </AppBar>
        <div style={{ padding: "1rem" }} value={value}>
          {value === 0 ? <SignIn /> : <SignUp />}
        </div>
      </Paper>
    </Container>
  );
}

export default Authen;
