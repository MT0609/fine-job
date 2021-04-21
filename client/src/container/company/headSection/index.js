import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Add, OpenInNew, LocationOn } from "@material-ui/icons";
import styles from "./index.module.scss";

function CompanyHeadContainer(props) {
  const { company } = props;
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
              "https://media-exp1.licdn.com/dms/image/C511BAQE35QoQIuQGNw/company-background_10000/0/1583747843273?e=1619085600&v=beta&t=pUvOgybj1qmMpLByPba5LEZ_248iZc7Op2PvwUwQKMA"
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

        <Grid
          container
          style={{ margin: "0.5rem", width: "100%" }}
          spacing={2}
          className={styles.company__head__buttons}
        >
          <Grid item>
            <button className={styles.company__head__follow}>
              <Add style={{ marginRight: "0.5rem" }} />
              Follow
            </button>
          </Grid>
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
      </section>
    </div>
  );
}

export default CompanyHeadContainer;
