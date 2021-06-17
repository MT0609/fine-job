import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { Box, Button, Tooltip, Grid, Typography } from "@material-ui/core";
import { GridList, GridListTile } from "@material-ui/core";
import { PersonAdd, RemoveCircle, Edit, LocationOn } from "@material-ui/icons";
import * as userActions from "../../actions/userActions";
import { getUserData } from "../../actions/authActions";
import { getMessage } from "../../actions/messageActions";
import ProfileUpdate from "../../container/profile/update";
import styles from "./index.module.scss";

function Profile() {
  const { id } = useParams();

  const myID = jwt_decode(
    localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)
  )?.sub;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getProfileData(id));
    dispatch(userActions.getConnectionStatus(id));
  }, [id, dispatch]);

  const userState = useSelector((state) => state.user);
  const user = userState.user;

  console.log(user);
  const [profileUpdateShow, setProfileUpdateShow] = useState(false);

  const handleSendConnection = () => {
    dispatch(userActions.sendConnReq(id));
  };

  const handleAcceptFriend = () => {
    dispatch(userActions.acceptConnReq(id));
  };

  const handleIgnore = () => {
    dispatch(userActions.deleteConnReq(id));
  };

  const handleDeleteFriend = () => {
    dispatch(userActions.deleteFriend(id));
  };

  const handleUpdate = async (data) => {
    const result = await dispatch(userActions.updateUser(data));
    if (result?.result) {
      setProfileUpdateShow(false);
      dispatch(getUserData());
    }
  };

  const handleGetMessage = () => {
    dispatch(getMessage(id));
  };

  return (
    <div className={styles.profile__container}>
      {user && (
        <>
          <section
            className={`${styles["profile__section"]} ${styles["profile__section--head"]}`}
          >
            <div className={styles.profile__avatars}>
              <img
                className={styles["profile__avatars--background"]}
                src={
                  user.backgroundAvt ||
                  "https://media-exp1.licdn.com/dms/image/C5616AQEjFPyW4_Pugg/profile-displaybackgroundimage-shrink_350_1400/0/1599461173965?e=1626912000&v=beta&t=bcX2BWSRLdPJPfFJV5XuXSoF6w-b_bOGopa0zNzEslM"
                }
                alt="background"
              />
              <img
                className={styles["profile__avatars--avatar"]}
                src={
                  user.avatar ||
                  "https://res.cloudinary.com/dghvjalhh/image/upload/v1610614321/avatars/dwmh6cncmhlzy6jtlskm.png"
                }
                alt="avatar"
              />
            </div>

            <div className={styles.profile__connect}>
              {id !== myID && (
                <>
                  {userState.connectStatus?.type === "friend" && (
                    <Tooltip title={t("people.remove")} placement="bottom">
                      <Button
                        onClick={handleDeleteFriend}
                        className={`${styles["profile__connect__button"]}`}
                      >
                        <RemoveCircle />
                      </Button>
                    </Tooltip>
                  )}

                  {userState.connectStatus?.type === "connSent" && (
                    <button
                      className={`${styles["profile__connect__button"]} ${styles["profile__connect--disabled"]}`}
                    >
                      <PersonAdd fontSize="small" />
                      <span className={`${styles["profile__connect__text"]}`}>
                        {t("people.pending")}
                      </span>
                    </button>
                  )}

                  {userState.connectStatus?.type === "waitForRespond" && (
                    <>
                      <button
                        className={`${styles["profile__connect__button"]} ${styles["profile__connect--active"]}`}
                        onClick={handleAcceptFriend}
                      >
                        {t("people.accept")}
                      </button>

                      <button
                        className={`${styles["profile__connect__button"]} ${styles["profile__connect--ignore"]}`}
                        onClick={handleIgnore}
                      >
                        {t("people.ignore")}
                      </button>
                    </>
                  )}

                  {userState.connectStatus?.type === "noConn" && (
                    <button
                      className={`${styles["profile__connect__button"]} ${styles["profile__connect--active"]}`}
                      onClick={handleSendConnection}
                    >
                      {t("people.connect")}
                    </button>
                  )}

                  <button
                    className={`${styles["profile__connect__button"]} ${styles["profile__connect--message"]} ${styles["profile__connect--largescreen"]}`}
                    onClick={handleGetMessage}
                  >
                    {t("people.message")}
                  </button>

                  <button
                    className={`${styles["profile__connect__button"]} ${styles["profile__connect--message"]} ${styles["profile__connect--smallscreen"]}`}
                  >
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/messages"
                    >
                      {t("people.message")}
                    </Link>
                  </button>
                </>
              )}
            </div>

            <div className={styles.profile__intro}>
              <Grid container alignItems="flex-start">
                <Grid item xs={12} md={7}>
                  <Typography variant="h5">
                    {user.baseInfo?.firstName} {user.baseInfo?.lastName}
                  </Typography>

                  <p>{user.headLine}</p>

                  {user.baseInfo?.location && (
                    <Box display="flex">
                      <LocationOn fontSize="small" />{" "}
                      {user.baseInfo?.location || "fsdkjdkfjs"}
                    </Box>
                  )}

                  <p className={styles.profile__basicInfoSpan}>
                    {user.contact?.email && (
                      <span>
                        {t("people.email")}: {user.contact?.email}
                      </span>
                    )}
                    {user.contact?.phone && (
                      <span>
                        {t("people.phone")}: {user.contact?.phone}
                      </span>
                    )}
                  </p>

                  <p className={styles.profile__basicInfoSpan}>
                    {user.baseInfo?.dob && (
                      <span>
                        {t("people.birthday")}:{" "}
                        {new Date(user.baseInfo?.dob).toLocaleDateString()}
                      </span>
                    )}
                  </p>

                  {id === myID && (
                    <Button
                      style={{
                        marginTop: "1rem",
                        padding: "0.3rem 1rem",
                        border: "1px solid #5E5E5E",
                        borderRadius: "20px",
                      }}
                      href="/resume"
                    >
                      {t("resume.myResumes")}
                    </Button>
                  )}
                </Grid>

                <Grid item xs md style={{ textAlign: "right" }}>
                  {id === myID && (
                    <>
                      <Button onClick={() => setProfileUpdateShow(true)}>
                        <Edit />
                      </Button>

                      <ProfileUpdate
                        data={user}
                        show={profileUpdateShow}
                        onclose={() => setProfileUpdateShow(false)}
                        onsubmit={handleUpdate}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">{t("people.about")}</Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button>
                      <Edit />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            <p>{user.about}</p>
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">{t("people.education")}</Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button>
                      <Edit />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            {user.baseInfo?.education?.map((education, index) => (
              <p>{education}</p>
            ))}
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">{t("people.skills")}</Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button>
                      <Edit />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            <GridList cols={3} spacing={10}>
              {user.skill?.map((skill, index) => (
                <GridListTile style={{ height: "fit-content" }} key={index}>
                  <p>{skill}</p>
                </GridListTile>
              ))}
            </GridList>
          </section>
        </>
      )}
    </div>
  );
}

export default Profile;
