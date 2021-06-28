import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { Box, Button, Tooltip, Grid, Typography } from "@material-ui/core";
import {
  PersonAdd,
  RemoveCircle,
  Add,
  Edit,
  Delete,
  LocationOn,
} from "@material-ui/icons";
import * as userActions from "../../actions/userActions";
import { getUserData } from "../../actions/authActions";
import { getMessage } from "../../actions/messageActions";
import BasicInfoUpdate from "../../container/profile/update/basicInfo";
import AboutUpdate from "../../container/profile/update/about";
import EducationUpdate from "../../container/profile/update/education";
import SkillUpdate from "../../container/profile/update/skill";
import AccomplishUpdate from "../../container/profile/update/accomplish";
import styles from "./index.module.scss";

function Profile() {
  const { id } = useParams();

  const myID = jwt_decode(
    localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN)
  )?.sub;

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getProfileData(id));
    dispatch(userActions.getConnectionStatus(id));
  }, [id, dispatch]);

  const userState = useSelector((state) => state.user);
  const user = userState.user;

  const [basicInfoUpdateShow, setBasicInfoUpdateShow] = useState(false);
  const [aboutUpdateShow, setAboutUpdateShow] = useState(false);
  const [skillUpdateShow, setSkillUpdateShow] = useState(false);
  const [eduUpdateShow, setEduUpdateShow] = useState(false);
  const [eduUpdateInfo, setEduUpdateInfo] = useState(null);
  const [accomplishUpdateShow, setAccomplishUpdateShow] = useState(false);
  const [accomplishUpdateInfo, setAccomplishUpdateInfo] = useState(null);

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

  const handleUpdateBasicInfo = async (data) => {
    const result = await dispatch(userActions.updateUser(data));
    if (result?.result) {
      setBasicInfoUpdateShow(false);
      dispatch(getUserData());
    }
  };

  const handleUpdateAbout = async (data) => {
    const result = await dispatch(userActions.updateUser(data));
    if (result?.result) {
      setAboutUpdateShow(false);
      dispatch(getUserData());
    }
  };

  const handleModifyEdu = async (data, type = "modify") => {
    let result;
    if (type === "modify")
      result = await dispatch(userActions.modifyEducation(data));
    else {
      // type delete
      const confirm = window.confirm(t("people.confirmDeleteEducation"));
      if (confirm) result = await dispatch(userActions.deleteEducation(data));
    }
    if (result?.result) {
      setEduUpdateShow(false);
      if (type !== "modify") toast("🦄 " + t("people.deleteEducationSuccess"));
      dispatch(getUserData());
    }
  };

  const handleModifyAccomplish = async (data, type = "modify") => {
    let result;
    if (type === "modify")
      result = await dispatch(userActions.modifyAccomplishment(data));
    else {
      // type delete
      const confirm = window.confirm(t("people.confirmDeleteAccomplishment"));
      if (confirm)
        result = await dispatch(userActions.deleteAccomplishment(data));
    }
    if (result?.result) {
      setAccomplishUpdateShow(false);
      if (type !== "modify")
        toast("🦄 " + t("people.deleteAccomplishmentSuccess"));
      dispatch(getUserData());
    }
  };

  const handleUpdateSkills = async (skills) => {
    const result = await dispatch(userActions.updateUser({ skills }));
    if (result?.result) {
      setSkillUpdateShow(false);
      dispatch(getUserData());
    }
  };

  const handleGetMessage = () => {
    dispatch(getMessage(id));
  };

  return (
    <div className={styles.profile__container}>
      <Helmet>
        <html lang={i18n.language || "en"} />
        <title>
          {user && user?.baseInfo?.firstName
            ? `${user?.baseInfo?.firstName} ${user?.baseInfo?.lastName} | `
            : ""}
          Profile | Fine Job
        </title>
      </Helmet>

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
                        {t("people.birthday", {
                          date: new Date(user.baseInfo?.dob),
                        })}
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
                      <Button onClick={() => setBasicInfoUpdateShow(true)}>
                        <Edit />
                      </Button>

                      <BasicInfoUpdate
                        data={user}
                        show={basicInfoUpdateShow}
                        onclose={() => setBasicInfoUpdateShow(false)}
                        onsubmit={handleUpdateBasicInfo}
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
                <Typography variant="h6">{t("people.about")}</Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button onClick={() => setAboutUpdateShow(true)}>
                      <Edit />
                    </Button>

                    <AboutUpdate
                      data={user.about}
                      show={aboutUpdateShow}
                      onclose={() => setAboutUpdateShow(false)}
                      onsubmit={handleUpdateAbout}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <p>{user.about}</p>
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6">{t("people.education")}</Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button
                      onClick={() => {
                        setEduUpdateInfo(null);
                        setEduUpdateShow(true);
                      }}
                    >
                      <Add />
                    </Button>

                    <EducationUpdate
                      data={eduUpdateInfo}
                      show={eduUpdateShow}
                      onclose={() => setEduUpdateShow(false)}
                      onsubmit={handleModifyEdu}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            {user.baseInfo?.educations?.map((education, index) => (
              <Box
                key={index}
                display="flex"
                mb={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={education.school?.web_pages[0]}
                    className={styles.profile__educations__name}
                  >
                    {education.school?.name}
                  </a>
                  <p>
                    <span className={styles.profile__educations__sub}>
                      {education.degree}
                    </span>
                    <span className={styles.profile__educations__sub}>
                      {education.degree && education.major && ", "}
                    </span>
                    <span className={styles.profile__educations__sub}>
                      {education.major}
                    </span>
                  </p>
                  {(education.start_date || education.end_date) && (
                    <p>
                      <span className={styles.profile__educations__date}>
                        {education.start_date
                          ? t("people.education_startTime", {
                              time: new Date(education.start_date),
                            })
                          : "?"}
                      </span>
                      <span className={styles.profile__educations__date}>
                        {education.end_date &&
                          `- ${t("people.education_endTime", {
                            time: new Date(education.end_date),
                          })}`}
                      </span>
                    </p>
                  )}
                </div>
                {id === myID && (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => {
                        setEduUpdateInfo(education);
                        setEduUpdateShow(true);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      onClick={() =>
                        handleModifyEdu({ id: education.id }, "delete")
                      }
                      color="primary"
                    >
                      <Delete />
                    </Button>
                  </div>
                )}
              </Box>
            ))}
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6">{t("people.skills")}</Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button onClick={() => setSkillUpdateShow(true)}>
                      <Edit />
                    </Button>

                    <SkillUpdate
                      user={user}
                      show={skillUpdateShow}
                      onclose={() => setSkillUpdateShow(false)}
                      onsubmit={handleUpdateSkills}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <Grid container component="ul" wrap="wrap">
              {user.skills?.map((skill, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <p>{skill}</p>
                </Grid>
              ))}
            </Grid>
          </section>

          <section className={styles.profile__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6">
                  {t("people.accomplishments")}
                </Typography>
              </Grid>
              <Grid item>
                {id === myID && (
                  <>
                    <Button
                      onClick={() => {
                        setAccomplishUpdateInfo(null);
                        setAccomplishUpdateShow(true);
                      }}
                    >
                      <Add />
                    </Button>

                    <AccomplishUpdate
                      data={accomplishUpdateInfo}
                      show={accomplishUpdateShow}
                      onclose={() => setAccomplishUpdateShow(false)}
                      onsubmit={handleModifyAccomplish}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            {user.accomplishments?.map((accomplishment, index) => (
              <Box
                key={index}
                display="flex"
                mb={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  {accomplishment.url ? (
                    <a
                      href={accomplishment.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.profile__accomplish__name}
                    >
                      {accomplishment?.name}
                    </a>
                  ) : (
                    <p className={styles.profile__accomplish__name}>
                      {accomplishment?.name}
                    </p>
                  )}

                  <p className={styles.profile__accomplish__sub}>
                    {accomplishment.description}
                  </p>
                  {(accomplishment.start_date || accomplishment.end_date) && (
                    <p>
                      <span className={styles.profile__accomplish__date}>
                        {accomplishment.start_date
                          ? t("people.accomplishment_startTime", {
                              time: new Date(accomplishment.start_date),
                            })
                          : "?"}
                      </span>
                      <span className={styles.profile__accomplish__date}>
                        {accomplishment.end_date &&
                          ` - ${t("people.accomplishment_endTime", {
                            time: new Date(accomplishment.end_date),
                          })}`}
                      </span>
                    </p>
                  )}
                </div>
                {id === myID && (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => {
                        setAccomplishUpdateInfo(accomplishment);
                        setAccomplishUpdateShow(true);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      onClick={() =>
                        handleModifyAccomplish(
                          { id: accomplishment.id },
                          "delete"
                        )
                      }
                      color="primary"
                    >
                      <Delete />
                    </Button>
                  </div>
                )}
              </Box>
            ))}
          </section>

          <section className={styles.profile__section}>
            <Box mb={1}>
              <Typography variant="h6">{t("people.interests")}</Typography>
            </Box>
            <Grid container spacing={2}>
              {user.followings?.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box display="flex" spacing={2}>
                    <img
                      src={
                        item.avatar ||
                        "https://media-exp1.licdn.com/dms/image/C4E0BAQG8Z55xihwvTw/company-logo_100_100/0/1560280656846?e=1632355200&v=beta&t=GJhd1ZFgWRZ4C4tPPD_hkaZITHVPPmG--SQmpzi6tSk"
                      }
                      alt="Company"
                      width={70}
                      height={70}
                    />
                    <Box pl={1}>
                      <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        {item.name}
                      </p>
                      <p>{item.baseInfo.industry}</p>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </section>
        </>
      )}
    </div>
  );
}

export default Profile;
