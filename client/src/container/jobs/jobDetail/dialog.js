import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dialog, DialogActions, DialogContent, Slide } from "@material-ui/core";
import { Button, Avatar, Grid, Box } from "@material-ui/core";
import { LocationOn, OpenInNew } from "@material-ui/icons";
import JobApplyDialog from "../apply";
import { timeDiff } from "../../../utils/time";
import styles from "./index.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JobDetailDialog(props) {
  const { job = null, show = false, close, onApply, onSave, onUnSave } = props;

  const { t } = useTranslation();
  const user = useSelector((state) => state.auth);
  const [jobApplyDialogShow, setJobApplyDialogShow] = useState(false);

  const handleApplyJob = (jobID, formData) => {
    if (onApply) onApply(jobID, formData);
  };

  const onSaveJob = () => {
    if (onSave) onSave(job.id);
  };

  const onUnSaveJob = () => {
    if (onUnSave) onUnSave(job.id);
  };

  const handleClose = () => {
    if (close) close();
  };

  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        {job && job.company && (
          <div className={styles.detail}>
            <Grid container spacing={2}>
              <Grid item>
                <Box display="flex" flexWrap="wrap">
                  <Avatar
                    variant="square"
                    alt="Company"
                    src={
                      job.company?.avatar ||
                      "https://carleton.ca/career/wp-content/uploads/icon_job_postings.png"
                    }
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />
                  <Link
                    to={`/jobs/${job.id}`}
                    style={{
                      width: "70%",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      lineHeight: 1,
                    }}
                  >
                    {job.title}
                  </Link>
                </Box>
              </Grid>
              <Grid item sm={8} style={{ textAlign: "left" }}>
                <Link to={`/company/${job.company?.id}`}>
                  {job.company?.name}
                </Link>
                <p className={styles.detail__subheader}>
                  <span>
                    {t("job.postedDay", {
                      date: new Date(job.posted),
                    })}
                  </span>
                  <span className={styles.detail__viewcount}>
                    {t("job.viewCount", { number: job.viewCount })}
                  </span>
                </p>
              </Grid>
              {job.status !== "open" && (
                <Grid item>
                  <Box
                    style={{
                      padding: "0.3rem 0.5rem",
                      backgroundColor: "red",
                      color: "white",
                      width: "fit-content",
                    }}
                  >
                    {t("job.status", { status: job.status })}
                  </Box>
                </Grid>
              )}
            </Grid>

            {user.isAuth && (
              <Box display="flex" flexWrap="wrap" alignItems="center">
                {job.directApplyUrl && (
                  <a href={job.directApplyUrl} target="_blank" rel="noreferrer">
                    <button className={styles.detail__directApply}>
                      <OpenInNew fontSize="small" />
                      {t("job.directApply")}
                    </button>
                  </a>
                )}
                <Box mt={1} mr={1} mb={1}>
                  {user.user?.applies?.some((el) => el.id === job.id) ? (
                    <button className={styles.detail__applied}>
                      {t("job.applyTimeAgo", {
                        timeDiff: timeDiff(
                          new Date(
                            user.user.applies.find(
                              (el) => el.id === job.id
                            ).createdAt
                          ),
                          new Date()
                        ),
                      })}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setJobApplyDialogShow(true)}
                        className={styles.detail__apply}
                      >
                        {t("job.apply")}
                      </button>
                      <JobApplyDialog
                        show={jobApplyDialogShow}
                        user={user.user}
                        job={job}
                        onsubmit={(jobID, formData) =>
                          handleApplyJob(jobID, formData)
                        }
                        onclose={() => setJobApplyDialogShow(false)}
                      />
                    </>
                  )}
                </Box>
                <Box mt={1} mb={1}>
                  {user.isAuth &&
                    (user.user?.savePosts?.some(
                      (savedJob) => savedJob.jobID === job.id
                    ) ? (
                      <button
                        onClick={onUnSaveJob}
                        className={styles.detail__save}
                      >
                        {t("job.unSave")}
                      </button>
                    ) : (
                      <button
                        onClick={onSaveJob}
                        className={styles.detail__save}
                      >
                        {t("job.save")}
                      </button>
                    ))}
                </Box>
              </Box>
            )}

            <section className={styles.detail__main}>
              {job.locations && job.locations.length && (
                <Box display="flex">
                  <LocationOn />
                  <div>
                    {job.locations.map((location, index) => (
                      <p key={index}>{location}</p>
                    ))}
                  </div>
                </Box>
              )}

              <div className={styles.detail__section}>
                <p>{t("job.description")}</p>
                <span>{job.description}</span>
              </div>

              <div className={styles.detail__section}>
                <p>{t("job.skills")}</p>
                <ul className={styles.detail__list}>
                  {job.skills.length &&
                    job.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                </ul>
              </div>

              <div className={styles.detail__section}>
                <p>{t("job.employmentType")}</p>

                <ul className={styles.detail__list}>
                  {job.job.jobType.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.detail__section}>
                <p>{t("job.maxSalary")}</p>
                <span>{job.maxSalary}</span>
              </div>
            </section>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t("job.cancelButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
