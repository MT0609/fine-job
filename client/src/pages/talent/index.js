import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Add, Edit, RemoveCircle } from "@material-ui/icons";
import { getMyPostingJobs, deleteJob } from "../../actions/jobActions";
import * as JOBCONSTANTS from "./../../constants/jobConstants";
import styles from "./index.module.scss";

function TalentHomePage() {
  const state = useSelector((state) => state.job);
  const jobs = state?.jobs;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPostingJobs());
  }, [dispatch]);

  const [deletedJobs, setDeletedJobs] = useState([]);

  const handleDeleteJob = async (id) => {
    const confirmation = window.confirm("Do you want to delete this job?");
    if (!confirmation) return;
    dispatch(deleteJob(id)).then((result) => {
      if (result?.status === JOBCONSTANTS.JOB_DELETE_SUCCESS) {
        let newDeletedJobs = [...deletedJobs];
        if (!newDeletedJobs.includes(id)) newDeletedJobs.push(id);
        setDeletedJobs(newDeletedJobs);
        toast("🦄 Job Deleted");
        return;
      }
      toast.error("Error deleting job. Please Try again");
    });
  };

  return (
    <div className={styles.talenthome}>
      {jobs.length ? (
        <Container
          maxWidth="sm"
          style={{
            padding: "1rem",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                variant="h5"
                style={{ textAlign: "left", color: "blue", fontWeight: "bold" }}
              >
                Post A Job
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/talent/post">
                <Button>
                  <Add />
                  Create Job
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Divider />
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`${
                deletedJobs.includes(job.id)
                  ? `${styles["talenthome__job--hide"]}`
                  : ""
              }`}
            >
              <div className={`${styles["talenthome__job"]}`}>
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
                  <Grid item xs={7} style={{ textAlign: "left" }}>
                    <Link
                      to={`/talent/post/${job.id}/applicants`}
                      className={styles.talenthome__name}
                    >
                      {job.title}
                    </Link>
                    <br />
                    <Link to={`/jobs/${job.id}`}>{job.company.name}</Link>
                    <p className={styles.talenthome__caption}>
                      <span
                        className={`${styles["talenthome__jobstatus"]} ${
                          job.status === "open"
                            ? styles["talenthome__jobstatus--open"]
                            : styles["talenthome__jobstatus--close"]
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className={styles["talenthome__applicants"]}>
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
                <p className={styles.talenthome__postday}>
                  Posted on {new Date(job.posted).toDateString()}
                </p>
              </div>
              <Divider />
            </div>
          ))}
        </Container>
      ) : (
        ""
      )}

      {jobs.length === 0 ? (
        <Paper
          style={{ margin: "auto", width: "fit-content", padding: "2rem 4rem" }}
        >
          <img
            src="https://static-exp1.licdn.com/sc/h/ndc6pztx1685rq1c8bx1tksx"
            alt="oops"
          />
          <Typography variant="h5" style={{ marginBottom: "1rem" }}>
            You do not have any posted job
          </Typography>
          <Link to="/talent/post">
            <Button>
              <Add />
              Create job
            </Button>
          </Link>
        </Paper>
      ) : (
        ""
      )}
    </div>
  );
}

export default TalentHomePage;
