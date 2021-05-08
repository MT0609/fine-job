import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider, Grid, Typography } from "@material-ui/core";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Add, OpenInNew, LocationOn } from "@material-ui/icons";
import styles from "./index.module.scss";

function CompanyHeadContainer(props) {
  const { company, tabValue, onTabChange } = props;

  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <section
        className={styles.company__sections + " " + styles.company__head}
      >
        <div className={styles.company__avatars}>
          <img
            className={styles["company__avatars--background"]}
            src={
              company.backgroundAvt ||
              "https://media-exp1.licdn.com/dms/image/C561BAQFgkUdG1rCrfw/company-background_10000/0/1570717328875?e=1620568800&v=beta&t=y3vgufzvLRh7wHIxNXyjotCBITG3MD2TBJB3tSWxvLI"
            }
            alt="background"
          />
          <img
            className={styles["company__avatars--avatar"]}
            src={
              company.avatar ||
              "https://media-exp1.licdn.com/dms/image/C560BAQGVFcyITngckQ/company-logo_200_200/0/1612233454537?e=1626912000&v=beta&t=F2DRY0utOedLtfpaxyI_pA2N2OMop9-dmFCgZD3rsEw"
            }
            alt="avatar"
          />
        </div>

        <div className={styles.company__introtext}>
          <Typography variant="h5">{company.name}</Typography>
          <p>{company.headLine}</p>

          {company.locations && company.locations.length ? (
            <Grid container spacing={3}>
              <Grid item>
                <LocationOn />
              </Grid>
              <Grid item>
                {company.locations.map((location, index) => (
                  <p key={index}>{location}</p>
                ))}
              </Grid>
            </Grid>
          ) : (
            ""
          )}

          <p>
            {company.followers ? (
              <span>{company.followers.length} followers</span>
            ) : (
              ""
            )}
            {company.employees ? (
              <span className={styles.company__head__employees}>
                {company.employees.length} employees
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <Grid container spacing={2} className={styles.company__head__buttons}>
          {auth.isAuth && (
            <Grid item>
              <button className={styles.company__head__follow}>
                <Add style={{ marginRight: "0.5rem" }} />
                Follow
              </button>
            </Grid>
          )}

          <Grid item>
            <a
              href={
                company.baseInfo?.linkWeb ||
                "https://career.vng.com.vn/co-hoi-nghe-nghiep"
              }
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.company__head__visit}>
                Visit Website
                <OpenInNew style={{ marginLeft: "0.5rem" }} />
              </button>
            </a>
          </Grid>
        </Grid>

        <Divider />

        <AppBar
          position="static"
          style={{
            background: "transparent",
            color: "black",
            boxShadow: "none",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, value) => {
              if (onTabChange) onTabChange(e, value);
            }}
            TabIndicatorProps={{ style: { background: "blue" } }}
          >
            <Tab
              style={{ fontWeight: "bold" }}
              label="Home"
              component={Link}
              to={`/company/${company.id}`}
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="Jobs"
              component={Link}
              to={`/company/${company.id}/jobs`}
            />
          </Tabs>
        </AppBar>
      </section>
    </div>
  );
}

export default CompanyHeadContainer;
