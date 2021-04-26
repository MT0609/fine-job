import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Link,
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
    const result = await dispatch(deleteJob(id));
    if (result?.status === JOBCONSTANTS.JOB_DELETE_SUCCESS) {
      let newDeletedJobs = [...deletedJobs];
      if (!newDeletedJobs.includes(id)) newDeletedJobs.push(id);
      setDeletedJobs(newDeletedJobs);
      return;
    }
    alert("Cannot delete job! Try again!");
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
              <Link href="/talent/post">
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
                    <Avatar
                      variant="square"
                      src={
                        job.company.avatar ||
                        "https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                      }
                      alt="company"
                    />
                  </Grid>
                  <Grid item xs={7} style={{ textAlign: "left" }}>
                    <p className={styles.talenthome__name}>{job.title}</p>
                    <p>{job.company.name}</p>
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
                  <Grid item xs style={{ textAlign: "right" }}>
                    <Link href={`/talent/post/${job.id}/update`}>
                      <Button>
                        <Edit />
                      </Button>
                    </Link>
                    <Button onClick={() => handleDeleteJob(job.id)}>
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
          <Link href="/talent/post">
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
