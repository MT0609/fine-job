import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Grid, Box } from "@material-ui/core";
import { LocationOn, OpenInNew } from "@material-ui/icons";
import JobApplyDialog from "../apply";
import { timeDiff } from "../../../utils/time";
import styles from "./index.module.scss";

function JobDetail(props) {
  const { job, onApply, onSave, onUnSave } = props;

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

  return (
    <>
      {job.company && (
        <div className={styles.detail}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                variant="square"
                alt="Company"
                src={
                  job.company?.avatar ||
                  "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                }
              />
            </Grid>
            <Grid item sm={8} style={{ textAlign: "left" }}>
              <Link
                to={`/jobs/${job.id}`}
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                }}
              >
                {job.title}
              </Link>
              <br />
              <Link to={`/company/${job.company?.id}`}>
                {job.company?.name}
              </Link>
              <p className={styles.detail__subheader}>
                <span>Posted on: {new Date(job.posted).toDateString()}</span>
                <span className={styles.detail__viewcount}>
                  {job.viewCount} views
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
                  {job.status}
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
                    Direct Apply
                  </button>
                </a>
              )}
              <Box mt={1} mr={1} mb={1}>
                {user.user?.applies?.some((el) => el.id === job.id) ? (
                  <button className={styles.detail__applied}>
                    Applied{" "}
                    {timeDiff(
                      new Date(
                        user.user.applies.find(
                          (el) => el.id === job.id
                        ).createdAt
                      ),
                      new Date()
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setJobApplyDialogShow(true)}
                      className={styles.detail__apply}
                    >
                      Apply Now
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
                      Unsave
                    </button>
                  ) : (
                    <button onClick={onSaveJob} className={styles.detail__save}>
                      Save
                    </button>
                  ))}
              </Box>
            </Box>
          )}

          <section className={styles.detail__main}>
            {job.locations && job.locations.length && (
              <Grid container spacing={3}>
                <Grid item>
                  <LocationOn />
                </Grid>
                <Grid item>
                  {job.locations.map((location, index) => (
                    <p key={index}>{location}</p>
                  ))}
                </Grid>
              </Grid>
            )}

            <div className={styles.detail__section}>
              <p>Description</p>
              <span>{job.description}</span>
            </div>

            <div className={styles.detail__section}>
              <p>Skills</p>
              <ul className={styles.detail__list}>
                {job.skills.length &&
                  job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
              </ul>
            </div>

            <div className={styles.detail__section}>
              <p>Employment Type</p>
              <ul className={styles.detail__list}>
                {job.job.jobType.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>

            <div className={styles.detail__section}>
              <p>Max Salary</p>
              <span>{job.maxSalary}</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default JobDetail;
