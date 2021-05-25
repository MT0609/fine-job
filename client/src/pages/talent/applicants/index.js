import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
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

  const job = useSelector((state) => state.job?.job);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobDetail(id));
    if (job?.id && job.creator !== auth.user?.id) history.replace("/talent");
  }, [id, dispatch, history]);

  const handleDeleteJob = async (id) => {
    const confirmation = window.confirm("Do you want to delete this job?");
    if (!confirmation) return;
    dispatch(deleteJob(id)).then((result) => {
      console.log(result);
      if (result?.status === JOBCONSTANTS.JOB_DELETE_SUCCESS) {
        toast("🦄 Job Deleted");
        history.replace("/talent");
      } else toast.error("Error deleting job. Please Try again");
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
                        "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
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
                      {job.status}
                    </span>
                    <span className={styles["job__applicants"]}>
                      {job.job.applicantCount} applicants
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
                Posted on {new Date(job.posted).toDateString()}
              </p>
            </>
          </div>

          <div className={styles.applicants}>
            <p className={styles.applicants__count}>
              {job.job.applicantCount === 0
                ? "No people has found applied for this job"
                : job.job.applicantCount === 1
                ? "1 person has applied for this job"
                : `${job.job.applicantCount} applies for this job`}
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
                              "https://res.cloudinary.com/dghvjalhh/image/upload/v1610614321/avatars/dwmh6cncmhlzy6jtlskm.png"
                            }
                            alt="company"
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
                        <p>{user.user.headLine || "No introduction"}</p>
                        <div className={styles.applicant__contact}>
                          <Mail /> {user.user.email}
                        </div>
                        <div className={styles.applicant__contact}>
                          <Phone /> {user.user.phone}
                        </div>
                        <Box display="flex" mt={1}>
                          <LocationOn fontSize="small" />
                          <span>{user.user.locations || "Location"}</span>
                        </Box>
                      </Grid>
                      {user.user.id === auth.user?.id && (
                        <Grid item md style={{ textAlign: "right" }}>
                          <button
                            className={styles.applicant__message}
                            onClick={() => handleGetMessage(user.user.id)}
                          >
                            Message
                          </button>
                        </Grid>
                      )}
                    </Grid>
                    <p className={styles.job__postday}>
                      Applied on {new Date(user.createdAt).toDateString()}
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
