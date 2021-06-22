import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Box, Avatar, Typography } from "@material-ui/core";
import { LocationOn, Cancel, OpenInNew } from "@material-ui/icons";
import CircularLoading from "../../../components/loading/circular";
import {
  getJobDetail,
  applyJob,
  saveJob,
  unSaveJob,
} from "../../../actions/jobActions";
import { timeDiff } from "../../../utils/time";
import JobApplyDialog from "../../../container/jobs/apply";
import styles from "./index.module.scss";

function JobView() {
  const { id } = useParams();

  const { t } = useTranslation();
  const jobState = useSelector((state) => state.job);
  const job = jobState.job;

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobDetail(id));
  }, [id, dispatch, jobState.saveStatus, jobState.unSaveStatus]);

  const [jobApplyDialogShow, setJobApplyDialogShow] = useState(false);

  const handleApplyJob = (jobID, formData) => {
    dispatch(applyJob(jobID, formData));
  };

  const handleSaveJob = () => {
    dispatch(saveJob(id));
  };

  const handleUnSaveJob = () => {
    dispatch(unSaveJob(id));
  };

  return (
    <div className={styles.container}>
      {!jobState.isLoading ? (
        job ? (
          <>
            <section className={styles.section}>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar
                  variant="square"
                  alt="company"
                  src={
                    job?.company?.avatar ||
                    "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                  }
                />
                <div>
                  <Link
                    className={`${styles.section__company} ${styles["section__company--name"]}`}
                    to={`/company/${job.company?.id}`}
                  >
                    {job?.company?.name}
                  </Link>
                  {job.company?.industry && (
                    <p className={styles.section__company}>
                      Industry: {job.company.industry}
                    </p>
                  )}
                </div>
              </Box>

              <Typography variant="h5">{job.title}</Typography>
              {job.status !== "close" && (
                <div
                  className={`${styles["section__title"]} ${styles["section__title--close"]}`}
                >
                  <Cancel fontSize="small" /> {t("job.noLongerAccept")}
                </div>
              )}

              <p>
                <span>
                  {t("job.postedTimeAgo", {
                    timeDiff: timeDiff(new Date(job.posted), new Date()),
                  })}
                </span>
                <span> &#8231; </span>
                <span>
                  {t("job.applicantNumber", {
                    number: job.job?.applicantCount,
                  })}
                </span>
              </p>

              {job.locations?.length && (
                <Box display="flex">
                  <LocationOn />
                  <div>
                    {job.locations.map((location, index) => (
                      <p key={index}>{location}</p>
                    ))}
                  </div>
                </Box>
              )}

              <Box display="flex" flexWrap="wrap" alignItems="flex-end">
                {job.directApplyUrl && (
                  <a href={job.directApplyUrl} target="_blank" rel="noreferrer">
                    <button className={styles.section__directApply}>
                      <OpenInNew fontSize="small" />
                      {t("job.directApply")}
                    </button>
                  </a>
                )}

                <Box mt={1} mr={1}>
                  {auth.isAuth &&
                    (auth.user?.applies?.some((job) => job.id === id) ? (
                      <button className={styles.section__applied}>
                        {t("job.applyTimeAgo", {
                          timeDiff: timeDiff(
                            new Date(
                              auth.user.applies.find(
                                (job) => job.id === id
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
                          className={styles.section__apply}
                        >
                          {t("job.apply")}
                        </button>
                        <JobApplyDialog
                          show={jobApplyDialogShow}
                          user={auth.user}
                          job={job}
                          onsubmit={(jobID, formData) =>
                            handleApplyJob(jobID, formData)
                          }
                          onclose={() => setJobApplyDialogShow(false)}
                        />
                      </>
                    ))}
                </Box>

                <Box mt={1}>
                  {auth.isAuth &&
                    (auth.user?.savePosts?.some((job) => job.jobID === id) ? (
                      <button
                        onClick={handleUnSaveJob}
                        className={styles.section__save}
                      >
                        {t("job.unSave")}
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveJob}
                        className={styles.section__save}
                      >
                        {t("job.save")}
                      </button>
                    ))}
                </Box>
              </Box>
            </section>

            <section className={styles.section}>
              <div className={styles.section__item}>
                <p className={styles.section__title}>{t("job.description")}</p>
                <p>{job.description}</p>
              </div>

              <div className={styles.section__item}>
                <p className={styles.section__title}>{t("job.skills")}</p>
                {job.skills?.length ? (
                  <p>
                    {job.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </p>
                ) : (
                  <p>{t("job.noSkills")}</p>
                )}
              </div>

              <div className={styles.section__item}>
                <p className={styles.section__title}>
                  {t("job.employmentType")}
                </p>
                {job.job?.jobType ? (
                  <p>
                    {job.job.jobType.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </p>
                ) : (
                  <p>{t("job.noEmploymentType")}</p>
                )}
              </div>

              <div className={styles.section__item}>
                <p className={styles.section__title}>{t("job.maxSalary")}</p>
                {!job.maxSalary ? (
                  <p>{job.maxSalary}</p>
                ) : (
                  <p>{t("job.noMaxSalary")}</p>
                )}
              </div>
            </section>
          </>
        ) : (
          <div>
            <p className={styles.section__title}>{t("job.jobNotFound")}</p>
          </div>
        )
      ) : (
        <CircularLoading />
      )}
    </div>
  );
}

export default JobView;
