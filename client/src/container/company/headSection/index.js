import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Divider, Grid, Typography } from "@material-ui/core";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Add, Check, OpenInNew, LocationOn } from "@material-ui/icons";
import styles from "./index.module.scss";

function CompanyHeadContainer(props) {
  const { company, tabValue, onTabChange, user, onFollow, onUnFollow } = props;
  const { t } = useTranslation();

  const handleOnFollowClick = () => {
    if (onFollow) onFollow();
  };

  const handleOnUnFollowClick = () => {
    if (onUnFollow) onUnFollow();
  };

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
              <span>
                {t("company.followNumber", {
                  number: company.followers.length,
                })}
              </span>
            ) : (
              ""
            )}
            {company.employees ? (
              <span className={styles.company__head__employees}>
                {t("company.employeeNumber", {
                  number: company.employees.length,
                })}
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <Grid container spacing={3} className={styles.company__head__buttons}>
          {user.isAuth &&
            (company.followers?.some(
              (follower) => follower.userID === user.user?.id
            ) ? (
              <Grid item>
                <button
                  className={styles.company__head__follow}
                  onClick={handleOnUnFollowClick}
                >
                  <Check style={{ marginRight: "0.5rem" }} />
                  <span>{t("company.following")}</span>
                </button>
              </Grid>
            ) : (
              <Grid item>
                <button
                  className={styles.company__head__follow}
                  onClick={handleOnFollowClick}
                >
                  <Add style={{ marginRight: "0.5rem" }} />
                  <span>{t("company.follow")}</span>
                </button>
              </Grid>
            ))}
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
                {t("company.visitWebsite")}
                <OpenInNew style={{ marginLeft: "0.5rem" }} />
              </button>
            </a>
          </Grid>
          <Grid item>
            {user.isAuth && user.user.id === company.owner && (
              <Link to={`/company/mine/${company.id}`}>
                <button
                  className={styles.company__head__follow}
                  onClick={handleOnUnFollowClick}
                >
                  Edit
                </button>
              </Link>
            )}
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
              style={{ fontWeight: "bold", textDecoration: "none" }}
              label={t("company.home")}
              component={Link}
              to={`/company/${company.id}`}
            />
            <Tab
              style={{ fontWeight: "bold", textDecoration: "none" }}
              label={t("company.jobs")}
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
