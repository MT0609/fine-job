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
import { Email, Phone, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CVBasicInfoUpdate from "../../../container/resume/update/basicUpdate";
import CVAboutUpdate from "../../../container/resume/update/aboutUpdate";
import CVExpUpdate from "../../../container/resume/update/expUpdate";
import CVEduUpdate from "../../../container/resume/update/eduUpdate";
import CVSkillUpdate from "../../../container/resume/update/skillUpdate";
import { JOBSKILLS } from "../../../constants/jobConstants";
import * as RESUMECONSTANTS from "../../../constants/resumeConstants";
import { getResume, updateResume } from "../../../actions/resumeActions";
import styles from "./index.module.scss";

function ResumeUpdate() {
  const { id } = useParams();
  const resumeState = useSelector((state) => state.resume);
  const cv = resumeState.cv;

  const updateInitialState = {
    basic: false,
    about: false,
    experience: false,
    education: false,
    skills: false,
  };
  const [updateDialog, setUpdateDialog] = useState(updateInitialState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getResume(id));
    }
  }, [id, dispatch]);

  const handleUpdate = async (data) => {
    console.log(data);
    const result = await dispatch(updateResume(id, data));

    if (result?.status === RESUMECONSTANTS.RESUME_UPDATE_SUCCESS) {
      setUpdateDialog(updateInitialState);
    }
  };

  const useStyles = makeStyles({
    btnEdit: {
      color: "#0A66C2",
    },
  });

  const classes = useStyles();

  return (
    <>
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
          <Typography variant="h4" style={{ letterSpacing: "1px" }}>
            {cv.title}
          </Typography>

          {/* basic info */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h5">
                  {cv.userSnapShort.baseInfo.firstName +
                    " " +
                    cv.userSnapShort.baseInfo.lastName}
                  <p>{cv.userSnapShort.baseInfo.location}</p>
                </Typography>
              </Grid>
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
                <Typography variant="h6">About</Typography>
              </Grid>
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
            </Grid>
            <Box>{cv.userSnapShort.about}</Box>
          </section>

          <Divider />

          {/* Experience */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6">Experience</Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.btnEdit}
                  onClick={() =>
                    setUpdateDialog((state) => ({ ...state, experience: true }))
                  }
                >
                  <Edit />
                </Button>
                <CVExpUpdate
                  open={updateDialog.experience}
                  onclose={() =>
                    setUpdateDialog((state) => ({
                      ...state,
                      experience: false,
                    }))
                  }
                  data={cv.userSnapShort.experiences}
                  onsubmit={handleUpdate}
                />
              </Grid>
            </Grid>
            {cv.userSnapShort.experiences.map((experience, index1) => {
              return (
                <Box style={{ marginBottom: "1rem" }}>
                  {Object.keys(experience).map((key, index2) => (
                    <p key={index1 + index2}>
                      {key}: {experience[key]}
                    </p>
                  ))}
                </Box>
              );
            })}
          </section>

          <Divider />

          {/* Educations */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6">Educations</Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.btnEdit}
                  onClick={() =>
                    setUpdateDialog((state) => ({ ...state, education: true }))
                  }
                >
                  <Edit />
                </Button>
                <CVEduUpdate
                  open={updateDialog.education}
                  onclose={() =>
                    setUpdateDialog((state) => ({
                      ...state,
                      education: false,
                    }))
                  }
                  data={cv.userSnapShort.baseInfo.education}
                  onsubmit={handleUpdate}
                />
              </Grid>
            </Grid>
            {cv.userSnapShort.baseInfo.education.map((edu, index1) => {
              return (
                <Box style={{ marginBottom: "1rem" }}>
                  {Object.keys(edu).map((key, index2) => (
                    <p key={index1 + index2}>
                      {key}: {edu[key]}
                    </p>
                  ))}
                </Box>
              );
            })}
          </section>

          <Divider />

          {/* Skills */}
          <section className={styles.cvupdate__section}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                  Skills
                </Typography>
              </Grid>
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

          {/* Licenses & certifications */}
          <section className={styles.cvupdate__section}>
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              Licenses & certifications
            </Typography>
            {cv.userSnapShort.licenseAndCert.map((cert, index1) => {
              return (
                <Box style={{ marginBottom: "1rem" }}>
                  {Object.keys(cert).map((key, index2) => (
                    <p key={index1 + index2}>
                      {key}: {cert[key]}
                    </p>
                  ))}
                </Box>
              );
            })}
          </section>
        </Container>
      )}
    </>
  );
}

export default ResumeUpdate;
