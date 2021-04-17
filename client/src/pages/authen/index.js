import React, { useState } from "react";
import { AppBar, Tabs, Tab, Paper, Container } from "@material-ui/core";
import TabPanel from "../../components/tabs/tabPanel";
import SignIn from "../../container/signin";
import SignUp from "../../container/signup";
import styles from "./authen.module.scss";

function Authen() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container fixed>
      <div className={styles.container}>
        <Paper className={styles.main}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              TabIndicatorProps={{ style: { background: "#ffc400" } }}
              tabItemContainerStyle={{
                backgroundColor: "#FFFFFF",
                width: "30%",
              }}
              inkBarStyle={{ backgroundColor: "red" }}
            >
              <Tab
                label="Login"
                id="simple-tab-0"
                aria-controls="simple-tabpanel-0"
              />
              <Tab
                label="Register"
                id="simple-tab-1"
                aria-controls="simple-tabpanel-1"
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <SignIn />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUp />
          </TabPanel>
        </Paper>
      </div>
    </Container>
  );
}

export default Authen;
