import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Divider,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Email, Phone, Edit, Add, Delete, GetApp } from "@material-ui/icons";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { makeStyles } from "@material-ui/core/styles";
import CVBasicInfoUpdate from "../../../container/resume/update/basicUpdate";
import CVAboutUpdate from "../../../container/resume/update/aboutUpdate";
import CVEduUpdate from "../../../container/resume/update/eduUpdate";
import CVSkillUpdate from "../../../container/resume/update/skillUpdate";
import AccomplishUpdate from "../../../container/resume/update/accomplishUpdate";
import { JOBSKILLS } from "../../../constants/jobConstants";
import * as cvActions from "../../../actions/resumeActions";
import * as RESUMECONSTANTS from "../../../constants/resumeConstants";
import styles from "./index.module.scss";

function ResumeUpdate() {
  const { id } = useParams();
  const resumeState = useSelector((state) => state.resume);
  const auth = useSelector((state) => state.auth);
  const cv = resumeState.cv;

  const updateInitialState = {
    basic: false,
    about: false,
    experience: false,
    education: false,
    skills: false,
    accomplish: false,
    license: false,
  };
  const [updateDialog, setUpdateDialog] = useState(updateInitialState);
  const [eduUpdateInfo, setEduUpdateInfo] = useState(null);
  const [accomplishUpdateInfo, setAccomplishUpdateInfo] = useState(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(cvActions.getResume(id));
    }
  }, [id, dispatch]);

  const handleUpdate = async (data, type = "modify") => {
    let result;
    if (type === "modify")
      result = await dispatch(cvActions.updateResume(id, data));
    else {
      // type delete
      const confirm = window.confirm(t("resume.deleteConfirm"));
      if (confirm) result = await dispatch(cvActions.deleteResume(id, data));
    }
    if (result?.status === RESUMECONSTANTS.RESUME_UPDATE_SUCCESS) {
      setUpdateDialog(updateInitialState);
      setEduUpdateInfo(null);
      if (type !== "modify" && data.educations)
        toast("🦄 " + t("people.deleteEducationSuccess"));
    }
  };

  const handleOpenDownLoad = (reqBody) => {
    // reqBody {id, title}
    dispatch(cvActions.downloadResume(reqBody));
  };

  const useStyles = makeStyles({
    btnEdit: {
      color: "#0A66C2",
    },
  });

  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>
          {cv && cv?.title ? `${cv.title} | ` : ""}
          Resume | Fine Job
        </title>
      </Helmet>
      {cv?.userSnapShort && (
        <Container
          maxWidth="sm"
          style={{
            padding: "1rem",
            textAlign: "left",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" style={{ letterSpacing: "1px" }}>
                {cv.title}
              </Typography>
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                onClick={() =>
                  handleOpenDownLoad({ id: cv.id, title: cv.title })
                }
                pending={resumeState.isLoading}
              >
                <GetApp />
              </LoadingButton>
            </Grid>
          </Grid>

          {/* basic info */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h5">
                  {cv.userSnapShort.baseInfo.lastName}
                  <p>{cv.userSnapShort.baseInfo.location}</p>
                </Typography>
              </Grid>
              {cv.userID === auth?.user?.id && (
                <Grid item>
                  <Button
                    className={classes.btnEdit}
                    onClick={() =>
                      setUpdateDialog((state) => ({ ...state, basic: true }))
                    }
                  >
                    <Edit />
                  </Button>
                  <CVBasicInfoUpdate
                    open={updateDialog.basic}
                    onclose={() =>
                      setUpdateDialog((state) => ({ ...state, basic: false }))
                    }
                    data={{
                      firstName: cv.userSnapShort.baseInfo?.firstName,
                      lastName: cv.userSnapShort.baseInfo?.lastName,
                      email: cv.userSnapShort.contact?.email,
                      phone: cv.userSnapShort.contact?.phone,
                    }}
                    onsubmit={handleUpdate}
                  />
                </Grid>
              )}
            </Grid>

            {cv.userSnapShort.contact.email && (
              <Box display="flex">
                <Box mr={1}>
                  <Email />
                </Box>
                <Box>{cv.userSnapShort.contact.email}</Box>
              </Box>
            )}

            {cv.userSnapShort.contact.phone && (
              <Box display="flex">
                <Box mr={1}>
                  <Phone />
                </Box>
                <Box>{cv.userSnapShort.contact.phone}</Box>
              </Box>
            )}
          </section>

          <Divider />

          {/* About */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6">{t("people.about")}</Typography>
              </Grid>
              {cv.userID === auth?.user?.id && (
                <Grid item>
                  <Button
                    className={classes.btnEdit}
                    onClick={() =>
                      setUpdateDialog((state) => ({ ...state, about: true }))
                    }
                  >
                    <Edit />
                  </Button>
                  <CVAboutUpdate
                    open={updateDialog.about}
                    onclose={() =>
                      setUpdateDialog((state) => ({ ...state, about: false }))
                    }
                    data={cv.userSnapShort.about}
                    onsubmit={handleUpdate}
                  />
                </Grid>
              )}
            </Grid>
            <Box>{cv.userSnapShort.about}</Box>
          </section>

          <Divider />

          {/* Educations */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6">{t("people.education")}</Typography>
              </Grid>
              {cv.userID === auth?.user?.id && (
                <Grid item>
                  <Button
                    className={classes.btnEdit}
                    onClick={() => {
                      setEduUpdateInfo(null);
                      setUpdateDialog((state) => ({
                        ...state,
                        education: true,
                      }));
                    }}
                  >
                    <Add />
                  </Button>
                  <CVEduUpdate
                    show={updateDialog.education}
                    onclose={() =>
                      setUpdateDialog((state) => ({
                        ...state,
                        education: false,
                      }))
                    }
                    data={eduUpdateInfo}
                    onsubmit={(data) => handleUpdate(data)}
                  />
                </Grid>
              )}
            </Grid>
            {cv.userSnapShort?.baseInfo.educations?.map((education, index) => (
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
                    className={styles.cvupdate__educations__name}
                  >
                    {education.school?.name}
                  </a>
                  <p>
                    <span className={styles.cvupdate__educations__sub}>
                      {education.degree}
                    </span>
                    <span className={styles.cvupdate__educations__sub}>
                      {education.degree && education.major && ", "}
                    </span>
                    <span className={styles.cvupdate__educations__sub}>
                      {education.major}
                    </span>
                  </p>
                  {(education.start_date || education.end_date) && (
                    <p>
                      <span className={styles.cvupdate__educations__date}>
                        {education.start_date
                          ? t("people.education_startTime", {
                              time: new Date(education.start_date),
                            })
                          : "?"}
                      </span>
                      <span className={styles.cvupdate__educations__date}>
                        {education.end_date &&
                          ` - ${t("people.education_endTime", {
                            time: new Date(education.end_date),
                          })}`}
                      </span>
                    </p>
                  )}
                </div>
                {cv.userID === auth?.user?.id && (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => {
                        setEduUpdateInfo(education);
                        setUpdateDialog((state) => ({
                          ...state,
                          education: true,
                        }));
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      onClick={() =>
                        handleUpdate(
                          { education: { id: education.id } },
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

          <Divider />

          {/* Skills */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                  {t("people.skills")}
                </Typography>
              </Grid>
              {cv.userID === auth?.user?.id && (
                <Grid item>
                  <Button
                    className={classes.btnEdit}
                    onClick={() =>
                      setUpdateDialog((prevState) => ({
                        ...prevState,
                        skills: true,
                      }))
                    }
                  >
                    <Edit />
                  </Button>
                  <CVSkillUpdate
                    allSkills={JOBSKILLS}
                    userSkills={cv.userSnapShort.skills}
                    open={updateDialog.skills}
                    onclose={() =>
                      setUpdateDialog((prevState) => ({
                        ...prevState,
                        skills: false,
                      }))
                    }
                    onsubmit={handleUpdate}
                  />
                </Grid>
              )}
            </Grid>
            <span>
              {cv.userSnapShort.skills.map((skill, index) => {
                let skillStr = skill;
                if (index !== cv.userSnapShort.skills.length - 1)
                  skillStr += ", ";
                return skillStr;
              })}
            </span>
          </section>

          <Divider />

          {/* Accomplishments */}
          <section className={styles.cvupdate__section}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6">
                  {t("people.accomplishments")}
                </Typography>
              </Grid>
              {cv.userID === auth?.user?.id && (
                <Grid item>
                  <Button
                    onClick={() => {
                      setAccomplishUpdateInfo(null);
                      setUpdateDialog((prevState) => ({
                        ...prevState,
                        accomplish: true,
                      }));
                    }}
                  >
                    <Add />
                  </Button>

                  <AccomplishUpdate
                    data={accomplishUpdateInfo}
                    show={updateDialog.accomplish}
                    onclose={() =>
                      setUpdateDialog((prevState) => ({
                        ...prevState,
                        accomplish: false,
                      }))
                    }
                    onsubmit={handleUpdate}
                  />
                </Grid>
              )}
            </Grid>
            {cv.userSnapShort.accomplishments?.map((accomplishment, index) => (
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
                      className={styles.cvupdate__accomplish__name}
                    >
                      {accomplishment?.name}
                    </a>
                  ) : (
                    <p className={styles.cvupdate__accomplish__name}>
                      {accomplishment?.name}
                    </p>
                  )}
                  <p className={styles.cvupdate__accomplish__sub}>
                    {accomplishment.description}
                  </p>
                  {(accomplishment.start_date || accomplishment.end_date) && (
                    <p>
                      <span className={styles.cvupdate__accomplish__date}>
                        {accomplishment.start_date
                          ? t("people.accomplishment_startTime", {
                              time: new Date(accomplishment.start_date),
                            })
                          : "?"}
                      </span>
                      <span className={styles.cvupdate__accomplish__date}>
                        {accomplishment.end_date &&
                          ` - ${t("people.accomplishment_endTime", {
                            time: new Date(accomplishment.end_date),
                          })}`}
                      </span>
                    </p>
                  )}
                </div>
                {cv.userID === auth?.user?.id && (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => {
                        setAccomplishUpdateInfo(accomplishment);
                        setUpdateDialog((prevState) => ({
                          ...prevState,
                          accomplish: true,
                        }));
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button
                      onClick={() =>
                        handleUpdate(
                          { accomplish: { id: accomplishment.id } },
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
        </Container>
      )}
    </>
  );
}

export default ResumeUpdate;
