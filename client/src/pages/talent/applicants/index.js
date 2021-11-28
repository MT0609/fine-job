import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getJobDetail } from "../../../actions/jobActions";
import { Link } from "react-router-dom";
import { Avatar, Button, Grid, Box } from "@material-ui/core";
import {
  Edit,
  RemoveCircle,
  Mail,
  Phone,
  LocationOn,
} from "@material-ui/icons";
import { deleteJob } from "../../../actions/jobActions";
import * as JOBCONSTANTS from "./../../../constants/jobConstants";
import { getMessage } from "../../../actions/messageActions";
import styles from "./index.module.scss";

function JobApplicantsView() {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const job = useSelector((state) => state.job?.job);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobDetail(id));
    if (job?.id && job.creator !== auth.user?.id) history.replace("/talent");
  }, [id, dispatch, history]);

  const handleDeleteJob = async (id) => {
    const confirmation = window.confirm(t("job.deleteConfirm"));
    if (!confirmation) return;
    dispatch(deleteJob(id)).then((result) => {
      console.log(result);
      if (result?.status === JOBCONSTANTS.JOB_DELETE_SUCCESS) {
        toast("🦄 " + t("job.deleteSuccess"));
        history.replace("/talent");
      } else toast.error(t("job.deleteFail"));
    });
  };

  const handleGetMessage = (userID) => {
    dispatch(getMessage(userID));
  };

  return (
    <>
      {job && job.id && (
        <>
          <div key={job.id} className={styles.job}>
            <>
              <Grid container spacing={2}>
                <Grid item>
                  <Link to={`/company/${job.company.id}`}>
                    <Avatar
                      variant="square"
                      src={
                        job.company.avatar ||
                        "https://res.cloudinary.com/dghvjalhh/image/upload/v1623952564/avatars/job_xjiuyn.svg"
                      }
                      alt="company"
                    />
                  </Link>
                </Grid>
                <Grid item xs={7}>
                  <p className={styles.job__name}>{job.title}</p>
                  <Link to={`/jobs/${job.id}`}>{job.company.name}</Link>
                  <p className={styles.talenthome__caption}>
                    <span
                      className={`${styles["job__status"]} ${
                        job.status === "open"
                          ? styles["job__status--open"]
                          : styles["job__status--close"]
                      }`}
                    >
                      {t("job.status", { status: job.status })}
                    </span>
                    <span className={styles["job__applicants"]}>
                      {t("job.applicantNumber", {
                        number: job.job?.applicantCount,
                      })}
                    </span>
                  </p>
                </Grid>
                <Grid item md style={{ textAlign: "right" }}>
                  <Link to={`/talent/post/${job.id}/update`}>
                    <Button style={{ color: "#0A66C2" }}>
                      <Edit />
                    </Button>
                  </Link>
                  <Button
                    style={{ color: "red" }}
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <RemoveCircle />
                  </Button>
                </Grid>
              </Grid>
              <p className={styles.job__postday}>
                {t("job.postedDay", {
                  date: new Date(job.posted),
                })}
              </p>
            </>
          </div>

          <div className={styles.applicants}>
            <p className={styles.applicants__count}>
              {t("job.applyNumStatus", {
                number: job.job.applicantCount,
              })}
            </p>
            {
              <>
                {job.job.applicants?.map((user, index) => (
                  <div key={index} className={styles.applicant}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Link to={`/profile/${user.user.id}`}>
                          <Avatar
                            src={
                              user.user.avtar ||
                              "https://res.cloudinary.com/dghvjalhh/image/upload/v1638072745/avatars/user_xscsme.png"
                            }
                            alt="applicant"
                          />
                        </Link>
                      </Grid>
                      <Grid item xs={8} md={8} lg={9}>
                        <Link
                          style={{
                            lineHeight: 1,
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}
                          to={`/profile/${user.user.id}`}
                        >
                          {user.user.firstName} {user.user.lastName}
                        </Link>
                        <p>{user.user.headLine}</p>
                        <div className={styles.applicant__contact}>
                          <Mail /> {user.user.email}
                        </div>
                        <div className={styles.applicant__contact}>
                          <Phone /> {user.user.phone}
                        </div>
                        {user.user.locations && (
                          <Box display="flex" mt={1}>
                            <LocationOn fontSize="small" />
                            <span>{user.user.locations}</span>
                          </Box>
                        )}
                      </Grid>
                      {user.user.id === auth.user?.id && (
                        <Grid item md style={{ textAlign: "right" }}>
                          <button
                            className={styles.applicant__message}
                            onClick={() => handleGetMessage(user.user.id)}
                          >
                            {t("people.message")}
                          </button>
                        </Grid>
                      )}
                    </Grid>
                    <p className={styles.job__postday}>
                      {t("job.appliedDay", {
                        date: new Date(user.createdAt),
                      })}
                    </p>
                  </div>
                ))}
              </>
            }
          </div>
        </>
      )}
    </>
  );
}

export default JobApplicantsView;
